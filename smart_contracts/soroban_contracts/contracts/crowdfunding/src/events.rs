use soroban_sdk::{vec, Env, Symbol};

pub(crate) fn pledged_amount_changed(e: &Env, total_amount: i128) {
    let topics = (Symbol::new(e, "contributed_amount_changed"),);
    e.events().publish(topics, total_amount);
}

pub(crate) fn target_reached(e: &Env, pledged: i128, target: i128) {
    let topics = (Symbol::new(e, "fundraise_target_reached"),);
    let event_payload = vec![e, pledged, target];
    e.events().publish(topics, event_payload);
}