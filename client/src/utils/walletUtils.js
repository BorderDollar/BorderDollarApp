import { requestAccess } from '@stellar/freighter-api';

// Function to connect to a wallet
export const connectWallet = async (walletType, setWalletAddress) => {
  try {
    let publicKey = '';
    if (walletType === 'Freighter') {
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
  if (walletType === 'Freighter' && window.freighterApi) {
    window.freighterApi.signOut();
  }
  // Add other wallet disconnection logic here
  console.log('Disconnected from wallet:', walletType);
};

export const shortenAddress = (address, length) =>
  `${address.slice(0, length)}...${address.slice(-length)}`;

// Function to generate a random color based on the wallet address
export const getAvatarColor = walletAddress => {
  const colors = [
    'red.500',
    'green.500',
    'blue.500',
    'purple.500',
    'orange.500',
    'teal.500',
    'pink.500',
    'cyan.500',
    'yellow.500',
    'gray.500',
  ];
  const hash = walletAddress
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};
