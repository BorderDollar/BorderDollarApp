import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  Text,
  Box,
  VStack,
} from '@chakra-ui/react';
import { sendUSDCToContract } from '../../utils/stellarUtils';
import { connectWallet } from '../../utils/walletUtils';

const InvestModal = ({ isOpen, onClose, campaignDetails }) => {
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInvestmentChange = e => setInvestmentAmount(e.target.value);

  const handleInvest = async () => {
    setIsLoading(true);
    try {
      if (!walletAddress) {
        await connectWallet('Freighter', setWalletAddress);
      }
      await sendUSDCToContract(campaignDetails.smartContract, investmentAmount * 10000000);
      onClose();
    } catch (error) {
      console.error('Investment failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setInvestmentAmount('');
      setIsLoading(false);
    } else {
      const storedWalletAddress = localStorage.getItem('walletAddress');
      if (storedWalletAddress) {
        setWalletAddress(storedWalletAddress);
      }
    }
  }, [isOpen]);

  const formatNumberWithCommas = number =>
    number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const extractDate = timestamp => timestamp.split('T')[0];

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Invest in {campaignDetails.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <FormControl id="investmentAmount">
              <FormLabel>Investment Amount</FormLabel>
              <Input
                type="number"
                value={investmentAmount}
                onChange={handleInvestmentChange}
                placeholder="Enter amount you want to invest"
                size="lg"
              />
            </FormControl>
            <Box borderWidth="1px" borderRadius="md" p={4} bg="gray.50">
              <Text fontWeight="bold" mb={2}>
                Campaign Details
              </Text>
              <Text>Campaign Name: {campaignDetails.title}</Text>
              <Text>
                Total Pool Value: {campaignDetails.currency}{' '}
                {formatNumberWithCommas(campaignDetails.amount)}
              </Text>
              <Text>APY: {campaignDetails.APR}%</Text>
              <Text>Asset Class: {campaignDetails.assetClass}</Text>
              <Text>Start Date: {extractDate(campaignDetails.startDate)}</Text>
              <Text>End Date: {extractDate(campaignDetails.endDate)}</Text>
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            size="lg"
            onClick={handleInvest}
            isLoading={isLoading}
            loadingText="Investing"
          >
            Invest
          </Button>
          <Button variant="ghost" size="lg" onClick={onClose} isDisabled={isLoading}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InvestModal;
