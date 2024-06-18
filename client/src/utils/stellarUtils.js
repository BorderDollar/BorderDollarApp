import { Horizon } from '@stellar/stellar-sdk';

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
