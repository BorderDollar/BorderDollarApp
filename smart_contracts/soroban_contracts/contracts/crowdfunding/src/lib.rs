#![no_std]
use soroban_sdk::{
    contract, contractimpl, contractmeta, contracttype, token, Address, Env, IntoVal, Val, Vec
};

mod events;
mod test;
mod testutils;

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Deadline,
    Recipient,
    Started,
    Target,
    Token,
    User(Address),
    RecipientClaimed,
    Contributors
}

#[derive(Clone, Copy, PartialEq, Eq)]
#[repr(u32)]
pub enum State {
    Running = 0,
    Success = 1,
    Expired = 2,
}

impl IntoVal<Env, Val> for State {
    fn into_val(&self, env: &Env) -> Val {
        (*self as u32).into_val(env)
    }
}

fn get_ledger_timestamp(e: &Env) -> u64 {
    e.ledger().timestamp()
}

fn get_recipient(e: &Env) -> Address {
    e.storage()
        .instance()
        .get::<_, Address>(&DataKey::Recipient)
        .expect("Campaign not initialized")
}

fn get_recipient_claimed(e: &Env) -> bool {
    e.storage()
        .instance()
        .get::<_, bool>(&DataKey::RecipientClaimed)
        .expect("Campaign not initialized")
}

fn get_deadline(e: &Env) -> u64 {
    e.storage()
        .instance()
        .get::<_, u64>(&DataKey::Deadline)
        .expect("Campaign not initialized")
}

fn get_started(e: &Env) -> u64 {
    e.storage()
        .instance()
        .get::<_, u64>(&DataKey::Started)
        .expect("Campaign not initialized")
}

fn get_target_amount(e: &Env) -> i128 {
    e.storage()
        .instance()
        .get::<_, i128>(&DataKey::Target)
        .expect("Campaign not initialized")
}

fn get_token(e: &Env) -> Address {
    e.storage()
        .instance()
        .get::<_, Address>(&DataKey::Token)
        .expect("Campaign not initialized")
}

fn get_user_deposited(e: &Env, user: &Address) -> i128 {
    e.storage()
        .instance()
        .get::<_, i128>(&DataKey::User(user.clone()))
        .unwrap_or(0)
}

fn get_balance(e: &Env, contract_id: &Address) -> i128 {
    let client = token::Client::new(e, contract_id);
    client.balance(&e.current_contract_address())
}

fn target_reached(e: &Env, token_id: &Address) -> bool {
    let target_amount = get_target_amount(e);
    let token_balance = get_balance(e, token_id);

    if token_balance >= target_amount {
        return true;
    };
    false
}

fn get_state(e: &Env) -> State {
    let deadline = get_deadline(e);
    let token_id = get_token(e);
    let current_timestamp = get_ledger_timestamp(e);

    if current_timestamp < deadline {
        return State::Running;
    };
    if get_recipient_claimed(e) || target_reached(e, &token_id) {
        return State::Success;
    };
    State::Expired
}

fn set_user_deposited(e: &Env, user: &Address, amount: &i128) {
    e.storage()
        .instance()
        .set(&DataKey::User(user.clone()), amount);
}

fn set_recipient_claimed(e: &Env) {
    e.storage()
        .instance()
        .set(&DataKey::RecipientClaimed, &true);
}

// Transfer tokens from the contract to the recipient
fn transfer(e: &Env, to: &Address, amount: &i128) {
    let token_contract_id = &get_token(e);
    let client = token::Client::new(e, token_contract_id);
    client.transfer(&e.current_contract_address(), to, amount);
}

fn get_contributors(e: &Env) -> Vec<Address> {
    e.storage().instance().get(&DataKey::Contributors).unwrap_or_else(|| Vec::new(e))
}

// Metadata that is added on to the WASM custom section
contractmeta!(
    key = "Description",
    val = "Crowdfunding contract that allows users to deposit USDC for a particular campaign"
);

#[contract]
struct Crowdfund;

/*
How to use this contract to run a crowdfund

1. Call initialize(recipient, deadline_unix_epoch, target_amount, token).
2. Donors send tokens to this contract's address
3. Once the target_amount is reached, the contract recipient can withdraw the tokens.
4. If the deadline passes without reaching the target_amount, the donors can withdraw their tokens again.
*/
#[contractimpl]
#[allow(clippy::needless_pass_by_value)]
impl Crowdfund {
    pub fn init(
        e: Env,
        recipient: Address,
        deadline: u64,
        target_amount: i128,
        token: Address,
    ) {
        assert!(
            !e.storage().instance().has(&DataKey::Recipient),
            "Campaign already initialized"
        );

        e.storage().instance().set(&DataKey::Recipient, &recipient);
        e.storage().instance().set(&DataKey::RecipientClaimed, &false);
        e.storage().instance().set(&DataKey::Started, &get_ledger_timestamp(&e));
        e.storage().instance().set(&DataKey::Deadline, &deadline);
        e.storage().instance().set(&DataKey::Target, &target_amount);
        e.storage().instance().set(&DataKey::Token, &token);
        e.storage().instance().set(&DataKey::Contributors, &Vec::<Address>::new(&e)); // Initialize empty list of contributors
    }

    pub fn recipient(e: Env) -> Address {
        get_recipient(&e)
    }

    pub fn deadline(e: Env) -> u64 {
        get_deadline(&e)
    }

    pub fn started(e: Env) -> u64 {
        get_started(&e)
    }

    pub fn state(e: Env) -> u32 {
        get_state(&e) as u32
    }

    pub fn target(e: Env) -> i128 {
        get_target_amount(&e)
    }

    pub fn token(e: Env) -> Address {
        get_token(&e)
    }

    // Get the list of contributors from the smart contract
    pub fn contributors(e: Env) -> Vec<Address> {
        get_contributors(&e)
    }

    pub fn balance(e: Env, user: Address) -> i128 {
        let recipient = get_recipient(&e);
        if get_state(&e) == State::Success {
            if user != recipient {
                return 0;
            };
            return get_balance(&e, &get_token(&e));
        };

        get_user_deposited(&e, &user)
    }

    pub fn deposit(e: Env, user: Address, amount: i128) {
        user.require_auth();
        assert!(amount > 0, "Amount must be positive");
        assert!(get_state(&e) == State::Running, "Campaign is not running");
        
        let token_id = get_token(&e);
        let current_target_met = target_reached(&e, &token_id);

        let recipient = get_recipient(&e);
        assert!(user != recipient, "Fundraiser may not deposit");

        let balance = get_user_deposited(&e, &user);
        set_user_deposited(&e, &user, &(balance + amount));

        let client = token::Client::new(&e, &token_id);
        client.transfer(&user, &e.current_contract_address(), &amount);

        let contract_balance = get_balance(&e, &token_id);

        // Add user to the list of contributors if not already present
        let mut contributors = get_contributors(&e);
        if !contributors.contains(&user) {
            contributors.push_back(user.clone());
            e.storage().instance().set(&DataKey::Contributors, &contributors);
        }

        // emit events
        events::pledged_amount_changed(&e, contract_balance);

        if !current_target_met && target_reached(&e, &token_id) {
            // only emit the target reached event once on the pledge that triggers target to be met
            events::target_reached(&e, contract_balance, get_target_amount(&e));
        }
    }

    pub fn withdraw(e: Env, to: Address) {
        let state = get_state(&e);
        let recipient = get_recipient(&e);

        match state {
            State::Running => {
                panic!("Campaign is still running")
            }
            State::Success => {
                assert!(
                    to == recipient,
                    "Campaign was successful, only the fundraiser may withdraw"
                );
                assert!(
                    !get_recipient_claimed(&e),
                    "Campaign was successful, fundraiser has withdrawn funds already"
                );

                let token = get_token(&e);
                transfer(&e, &recipient, &get_balance(&e, &token));
                set_recipient_claimed(&e);
            }
            State::Expired => {
                assert!(
                    to != recipient,
                    "Campaign expired, the fundraiser may not withdraw"
                );

                // Withdraw full amount
                let balance = get_user_deposited(&e, &to);
                set_user_deposited(&e, &to, &0);
                transfer(&e, &to, &balance);

                // emit events
                let token_id = get_token(&e);
                let contract_balance = get_balance(&e, &token_id);
                events::pledged_amount_changed(&e, contract_balance);
            }
        };
    }

}
