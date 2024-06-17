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
import { disconnectWallet, shortenAddress } from '../../utils/walletUtils';

const Header = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const logoPath = '/BorderDollarFullLogo.jpeg'; // Replace with the actual path to your logo
  const headerHeight = useBreakpointValue({ base: '60px', md: '60px' }); // Consistent height on all screens
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // Check if there's a wallet address saved in localStorage
    const savedAddress = localStorage.getItem('walletAddress');
    if (savedAddress) {
      setWalletAddress(savedAddress);
    }
  }, []);

  const buttonWidth = useBreakpointValue({ base: '196px', md: '262px' });
  const buttonHeight = '31px';

  const handleDisconnect = () => {
    disconnectWallet('freighter', setWalletAddress);
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
                  name="Profile Icon"
                  src="/path/to/profile/icon.png"
                />{' '}
                {/* Replace with the actual path to your profile icon */}
                <Text fontSize="sm" align="center">
                  {shortenAddress(walletAddress, 4)}
                </Text>
              </HStack>
            </MenuButton>
            <MenuList color="black">
              <Box p={4}>
                <Text fontWeight="bold">{shortenAddress(walletAddress, 4)}</Text>
                <Text fontSize="sm">0.07 ETH</Text>{' '}
                {/* Replace with actual balance */}
              </Box>
              <MenuItem>
                <Text>Verify identity</Text>
              </MenuItem>
              <MenuItem>
                <Text>Network: Ethereum</Text>
              </MenuItem>
              <MenuItem>
                <Text>Wallet: Freighter</Text>{' '}
                {/* Replace with actual wallet */}
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
      />
    </>
  );
};

export default Header;
