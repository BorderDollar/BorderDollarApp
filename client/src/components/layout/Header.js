import React, { useState, useEffect } from 'react';
import {
  Flex,
  Button,
  Box,
  Image,
  Spacer,
  useDisclosure,
  useBreakpointValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Avatar,
  HStack,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import ConnectModal from './ConnectModal';
import {
  disconnectWallet,
  getAvatarColor,
  shortenAddress,
} from '../../utils/walletUtils';
import { getUsdcBalance } from '../../utils/stellarUtils';
import { formatNumberWithTwoDecimalPlaces } from '../../utils/formatNumber';

const Header = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [network, setNetwork] = useState('');
  const [walletType, setWalletType] = useState('');
  const [usdcBalance, setUSDCBalance] = useState('');
  const logoPath = useBreakpointValue({
    base: '/BorderDollarLogo.png', // Replace with the actual path to your mobile logo
    md: '/BorderDollarFullLogo.jpeg', // Replace with the actual path to your desktop logo
  });
  const headerHeight = useBreakpointValue({ base: '60px', md: '60px' }); // Consistent height on all screens
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // Check if there are values saved in localStorage
    const savedAddress = localStorage.getItem('walletAddress');
    const savedNetwork = localStorage.getItem('network');
    const savedWalletType = localStorage.getItem('walletType');

    if (savedAddress) {
      setWalletAddress(savedAddress);
      getUsdcBalance(savedAddress).then(balance => setUSDCBalance(balance));
    }

    if (savedNetwork) {
      setNetwork(savedNetwork);
    }

    if (savedWalletType) {
      setWalletType(savedWalletType);
    }
  }, []);

  useEffect(() => {
    if (walletAddress) {
      getUsdcBalance(walletAddress).then(balance => setUSDCBalance(balance));
    }
  }, [walletAddress]);

  const buttonWidth = useBreakpointValue({ base: '262px', md: '262px' });
  const buttonHeight = '31px';

  const handleDisconnect = () => {
    disconnectWallet(walletType, setWalletAddress);
    setNetwork('');
    setWalletType('');
    setUSDCBalance('');
    // Remove from localStorage
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('network');
    localStorage.removeItem('walletType');
  };

  return (
    <>
      <Flex
        as="header"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        h={headerHeight}
        bg="white"
        color="white"
        px={{ base: 1, md: 6 }}
        position="fixed"
        zIndex="banner"
        top={0}
        left={0}
      >
        {/* Logo */}
        <Box display={{ base: 'block', md: 'none' }} flexShrink={0} h="100%">
          <Image src={logoPath} maxH="full" objectFit="contain" />
        </Box>

        {/* Spacer to push the connect button to the right */}
        <Spacer />

        {/* Connect Button or Dropdown */}
        {walletAddress ? (
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              colorScheme="orange"
              size="md"
              w={buttonWidth}
              h={buttonHeight}
            >
              <HStack spacing={2} align="center">
                <Avatar
                  size="xs"
                  name={shortenAddress(walletAddress, 1)}
                  bg={getAvatarColor(walletAddress)}
                />
                <Text fontSize="sm" align="center">
                  {shortenAddress(walletAddress, 4)}
                </Text>
                <Text fontSize="sm" align="center">
                  {formatNumberWithTwoDecimalPlaces(usdcBalance)} USDC
                </Text>
              </HStack>
            </MenuButton>
            <MenuList color="black">
              <Box p={4}>
                <Text fontWeight="bold">
                  {shortenAddress(walletAddress, 4)}
                </Text>
                <Text fontSize="sm">{usdcBalance} USDC</Text>
              </Box>
              <MenuItem>
                <Text>Verify identity</Text>
              </MenuItem>
              <MenuItem>
                <Text>Network: {network}</Text>
              </MenuItem>
              <MenuItem>
                <Text>Wallet: {walletType}</Text>
              </MenuItem>
              <MenuItem onClick={handleDisconnect}>
                <Text>Disconnect</Text>
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Button
            colorScheme="orange"
            variant="solid"
            size="md"
            maxHeight="100%"
            w={buttonWidth}
            h={buttonHeight}
            onClick={onOpen}
          >
            Connect
          </Button>
        )}
      </Flex>

      <ConnectModal
        isOpen={isOpen}
        onClose={onClose}
        setWalletAddress={setWalletAddress}
        setNetwork={setNetwork}
        setWalletType={setWalletType}
      />
    </>
  );
};

export default Header;
