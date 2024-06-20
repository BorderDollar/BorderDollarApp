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

const InvestModal = ({ isOpen, onClose, campaignDetails }) => {
  const [investmentAmount, setInvestmentAmount] = useState('');

  const handleInvestmentChange = (e) => setInvestmentAmount(e.target.value);

  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const extractDate = (timestamp) => {
    return timestamp.split('T')[0];
  };

  useEffect(() => {
    if (!isOpen) {
      setInvestmentAmount('');
    }
  }, [isOpen]);

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
              <Text fontWeight="bold" mb={2}>Campaign Details</Text>
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
          <Button colorScheme="blue" mr={3} size="lg" onClick={onClose}>
            Invest
          </Button>
          <Button variant="ghost" size="lg" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InvestModal;