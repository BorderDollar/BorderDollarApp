import {
  Horizon,
  TransactionBuilder,
  Asset,
  Networks,
  SorobanRpc,
  nativeToScVal,
  Address,
  BASE_FEE,
  Contract,
} from '@stellar/stellar-sdk';
import { getPublicKey, signTransaction } from '@stellar/freighter-api';

// Function to get XLM balance
export const getXlmBalance = async walletAddress => {
  const server = new Horizon.Server('https://horizon-testnet.stellar.org');
  try {
    const account = await server.loadAccount(walletAddress);
    const balance = account.balances.find(b => b.asset_type === 'native');
    return balance ? balance.balance : '0';
  } catch (error) {
    console.error('Error fetching XLM balance:', error);
    return '0';
  }
};

// Function to get USDC balance
export const getUsdcBalance = async walletAddress => {
  const USDC = new Asset(
    'USDC',
    'GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5'
  );

  const server = new Horizon.Server('https://horizon-testnet.stellar.org');
  try {
    const account = await server.loadAccount(walletAddress);
    const balance = account.balances.find(
      b => b.asset_code === USDC.code && b.asset_issuer === USDC.issuer
    );
    return balance ? balance.balance : '0';
  } catch (error) {
    console.error('Error fetching USDC balance:', error);
    return '0';
  }
};

// Function to send USDC to the contract
export const sendUSDCToContract = async (contractAddress, sent_amount) => {
  const contract = new Contract(contractAddress);
  const NETWORK_PASSPHRASE = Networks.TESTNET;
  const server = new SorobanRpc.Server(
    'https://soroban-testnet.stellar.org:443'
  );
  let pubKey = await getPublicKey();
  const sourceAccount = await server.getAccount(pubKey);

  const sentAmount = nativeToScVal(sent_amount, { type: 'i128' });
  const params = [new Address(pubKey).toScVal(), sentAmount];

  let transaction = new TransactionBuilder(sourceAccount, {
    fee: BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(contract.call('deposit', ...params))
    .setTimeout(300)
    .build();

  transaction = await server.prepareTransaction(transaction);
  console.log(transaction);

  try {
    let signed_tx_xdr = await signTransaction(
      transaction.toEnvelope().toXDR('base64'),
      {
        network: 'TESTNET',
        networkPassphrase: NETWORK_PASSPHRASE,
        accountToSign: pubKey,
      }
    );
    console.log('tx signed');

    let signed_tx = TransactionBuilder.fromXDR(
      signed_tx_xdr,
      NETWORK_PASSPHRASE
    );
    console.log('tx read from XDR');

    let response = await server.sendTransaction(signed_tx);

    if (response.status !== 'PENDING') {
      throw new Error(response.errorResultXdr);
    }

    let getResponse = await server.getTransaction(response.hash);
    const retryWait = 1000; // 1 sec
    let retries = 10;

    while (getResponse.status === 'NOT_FOUND' && retries > 0) {
      await new Promise(resolve => setTimeout(resolve, retryWait));
      getResponse = await server.getTransaction(response.hash);
      retries -= 1;
    }

    if (getResponse.status !== 'SUCCESS') {
      throw new Error(`Transaction failed: ${getResponse.resultXdr}`);
    }

    console.log('Deposit Successful!');
  } catch (e) {
    console.error('Error invoking contract:', e);
    throw new Error(e);
  }
};
