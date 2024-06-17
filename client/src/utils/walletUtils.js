import { requestAccess } from '@stellar/freighter-api';

// Function to connect to a wallet
export const connectWallet = async (walletType, setWalletAddress) => {
  try {
    let publicKey = '';
    if (walletType === 'freighter') {
      publicKey = await requestAccess();
      setWalletAddress(publicKey);
      localStorage.setItem('walletAddress', publicKey);
    }
    // Add other wallet connection logic here
    console.log('Connected with public key:', publicKey);
    return publicKey;
  } catch (error) {
    console.error('Connection failed:', error);
    throw error;
  }
};

// Function to disconnect from a wallet
export const disconnectWallet = (walletType, setWalletAddress) => {
  setWalletAddress('');
  localStorage.removeItem('walletAddress');
  if (walletType === 'freighter' && window.freighterApi) {
    window.freighterApi.signOut();
  }
  // Add other wallet disconnection logic here
  console.log('Disconnected from wallet:', walletType);
};

export const shortenAddress = (address, length) =>
    `${address.slice(0, length)}...${address.slice(-length)}`;