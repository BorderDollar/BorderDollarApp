import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  VStack,
  useToast,
  Flex,
  HStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../api/supabaseClient';
import AdminLayout from '../../components/layout/AdminLayout';

const CreateCampaign = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [APR, setAPR] = useState('');
  const [assetClass, setAssetClass] = useState('');
  const [partners, setPartners] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const fetchPartners = useCallback(async () => {
    const { data, error } = await supabase.from('partner').select('*');
    if (error) {
      console.error('Error fetching partners:', error);
      toast({
        title: 'Error',
        description: 'There was an error fetching the partners.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } else {
      setPartners(data);
    }
  }, [toast]);

  useEffect(() => {
    fetchPartners();
    window.scrollTo(0, 0); // Scroll to the top when the component mounts
  }, [fetchPartners]);

  const handleSubmit = async e => {
    e.preventDefault();
    const { error } = await supabase.from('campaign').insert([
      {
        campaign_name: title,
        campaign_amount: amount,
        campaign_currency: currency,
        start_date: startDate,
        completed_date: endDate,
        APR,
        asset_class: assetClass,
        partner_id: selectedPartner,
      },
    ]);
    if (error) {
      console.error('Error creating campaign:', error);
      toast({
        title: 'Error',
        description: 'There was an error creating the campaign.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } else {
      navigate('/admin');
      toast({
        title: 'Success',
        description: 'Campaign created successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleCancel = () => {
    navigate('/admin'); // Navigate back to the admin dashboard
  };

  return (
    <AdminLayout>
      <Flex justify="center" align="center" minHeight="calc(100vh - 60px)">
        <Box
          as="form"
          onSubmit={handleSubmit}
          maxW="5xl"
          p={6}
          boxShadow="md"
          borderRadius="md"
          bg="white"
          w="full"
        >
          <VStack spacing={4} align="flex-start">
            <FormControl id="title" isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <FormHelperText>Enter the campaign title.</FormHelperText>
            </FormControl>

            <FormControl id="amount" isRequired>
              <FormLabel>Amount</FormLabel>
              <NumberInput
                value={amount}
                onChange={valueString => setAmount(valueString)}
                min={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormHelperText>
                Enter the funding amount for the campaign.
              </FormHelperText>
            </FormControl>

            <FormControl id="currency" isRequired>
              <FormLabel>Currency</FormLabel>
              <Select
                value={currency}
                onChange={e => setCurrency(e.target.value)}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </Select>
              <FormHelperText>
                Select the currency for the campaign.
              </FormHelperText>
            </FormControl>

            <FormControl id="start-date" isRequired>
              <FormLabel>Start Date</FormLabel>
              <Input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
              />
              <FormHelperText>
                Select the start date for the campaign.
              </FormHelperText>
            </FormControl>

            <FormControl id="end-date" isRequired>
              <FormLabel>End Date</FormLabel>
              <Input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
              />
              <FormHelperText>
                Select the end date for the campaign.
              </FormHelperText>
            </FormControl>

            <FormControl id="apr" isRequired>
              <FormLabel>APR</FormLabel>
              <NumberInput
                value={APR}
                onChange={valueString => setAPR(valueString)}
                min={0}
                max={100}
                precision={2}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormHelperText>
                Enter the Annual Percentage Rate (APR) for the campaign.
              </FormHelperText>
            </FormControl>

            <FormControl id="asset-class" isRequired>
              <FormLabel>Asset Class</FormLabel>
              <Input
                placeholder="Asset Class"
                value={assetClass}
                onChange={e => setAssetClass(e.target.value)}
              />
              <FormHelperText>
                Enter the asset class for the campaign.
              </FormHelperText>
            </FormControl>

            <FormControl id="partner" isRequired>
              <FormLabel>Partner</FormLabel>
              <Select
                placeholder="Select Partner"
                value={selectedPartner}
                onChange={e => setSelectedPartner(e.target.value)}
              >
                {partners.map(partner => (
                  <option key={partner.partner_id} value={partner.partner_id}>
                    {partner.company_name}
                  </option>
                ))}
              </Select>
              <FormHelperText>
                Select the partner for the campaign.
              </FormHelperText>
            </FormControl>

            <HStack spacing={4}>
              <Button type="submit" colorScheme="blue" size="lg">
                Create Campaign
              </Button>
              <Button onClick={handleCancel} colorScheme="gray" size="lg">
                Cancel
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Flex>
    </AdminLayout>
  );
};

export default CreateCampaign;
