import {
  Contract,
  SorobanRpc,
  TransactionBuilder,
  Keypair,
  Networks,
  BASE_FEE,
  Address,
  nativeToScVal,
} from '@stellar/stellar-sdk';

async function sorobanContractInitialize(
  fundraising_smart_contract,
  recipient,
  deadline_unix_epoch,
  target_amount,
  token
) {
  const sourceKeypair = Keypair.fromSecret(
    process.env.REACT_APP_SOROBAN_BORDERDOLLAR_PRIVATE_KEY
  );

  const contract = new Contract(fundraising_smart_contract);

  const NETWORK_PASSPHRASE = Networks.TESTNET;

  const server = new SorobanRpc.Server(
    'https://soroban-testnet.stellar.org:443'
  );
  const sourceAccount = await server.getAccount(sourceKeypair.publicKey());
  const deadlineScVal = nativeToScVal(deadline_unix_epoch, { type: 'u64' });
  const targetAmount = nativeToScVal(target_amount, { type: 'i128' });

  const params = [
    new Address(recipient).toScVal(),
    deadlineScVal,
    targetAmount,
    new Address(token).toScVal(),
  ];

  let transaction = new TransactionBuilder(sourceAccount, {
    fee: BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(contract.call('init', ...params))
    .setTimeout(300)
    .build();

  try {
    transaction = await server.prepareTransaction(transaction);
    transaction.sign(sourceKeypair);
    const response = await server.sendTransaction(transaction);

    if (response.status !== 'PENDING') {
      throw Error(response.errorResultXdr);
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
      throw Error(`Transaction failed: ${getResponse.resultXdr}`);
    }

    console.log('Initialization Successful!');
  } catch (e) {
    console.error('Error invoking contract:', e);
    throw new Error(e);
  }
}

export default sorobanContractInitialize;
