import { Horizon, Asset } from '@stellar/stellar-sdk';

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
