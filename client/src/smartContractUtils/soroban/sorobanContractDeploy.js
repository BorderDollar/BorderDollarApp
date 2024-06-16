import {
  Contract,
  SorobanRpc,
  TransactionBuilder,
  Keypair,
  Networks,
  BASE_FEE,
  xdr,
  Address,
  scValToNative,
} from '@stellar/stellar-sdk';

async function sorobanContractDeploy(deployer, wasmHash) {
  const contractKey =
    process.env.REACT_APP_SOROBAN_CROWDFUNDING_FACTORY_SMART_CONTACT_CODE;
  const sourceKeypair = Keypair.fromSecret(
    process.env.REACT_APP_SOROBAN_BORDERDOLLAR_PRIVATE_KEY
  );
  const contractIdSalt = xdr.ScVal.scvBytes(Keypair.random().rawSecretKey());
  const contract = new Contract(contractKey);
  const NETWORK_PASSPHRASE = Networks.TESTNET;
  const server = new SorobanRpc.Server(
    'https://soroban-testnet.stellar.org:443'
  );
  const sourceAccount = await server.getAccount(sourceKeypair.publicKey());

  const params = [
    new Address(deployer).toScVal(),
    xdr.ScVal.scvBytes(Buffer.from(wasmHash, 'hex')),
    contractIdSalt,
  ];

  let transaction = new TransactionBuilder(sourceAccount, {
    fee: BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(contract.call('deploy', ...params))
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

    // Extracting return value
    const resultXdr = getResponse.resultMetaXdr;
    const returnValue = resultXdr.v3().sorobanMeta().returnValue();
    const newContract = scValToNative(returnValue);

    console.log("Deployed contract address:", newContract);

    return newContract;
  } catch (e) {
    console.error('Error invoking contract:', e);
    throw new Error(e);
  }
}

export default sorobanContractDeploy;
