import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Box,
  Stack,
  Flex,
  Image,
} from '@chakra-ui/react';
import { connectWallet } from '../../utils/walletUtils';

const ConnectModal = ({ isOpen, onClose, setWalletAddress }) => {
  const handleConnect = async (wallet) => {
    try {
      await connectWallet(wallet, setWalletAddress);
      onClose();
    } catch (error) {
      console.error('Connection failed:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="xl" boxShadow="xl">
        <ModalHeader fontSize="lg" fontWeight="bold">
          Connect Wallet
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={4}>Select your wallet to connect:</Text>
          <Stack spacing={4}>
            <Box
              as="button"
              onClick={() => handleConnect('freighter')}
              border="1px"
              borderColor="gray.200"
              borderRadius="lg"
              p={4}
              _hover={{ bg: 'gray.50' }}
              display="flex"
              alignItems="center"
            >
              <Image
                src="/freighterapplogo.png"
                alt="Freighter Wallet"
                boxSize="32px"
                mr={4}
              />
              <Flex direction="column" align="start">
                <Text fontWeight="bold">Freighter</Text>
                <Text fontSize="sm" color="gray.500">
                  Recommended
                </Text>
              </Flex>
            </Box>
          </Stack>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Text fontSize="sm" color="gray.500">
            New to wallets?{' '}
            <a
              href="https://freighter.app"
              style={{ color: 'blue' }}
              target="_blank"
              rel="noreferrer"
            >
              Get started
            </a>
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConnectModal;
