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
  Spinner,
  Alert,
  AlertIcon,
  useToast,
  Flex,
  HStack,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../api/supabaseClient';
import AdminLayout from '../../components/layout/AdminLayout';

const EditCampaign = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [APR, setAPR] = useState('');
  const [assetClass, setAssetClass] = useState('');
  const [partners, setPartners] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

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

  const fetchCampaign = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('campaign')
      .select('*')
      .eq('campaign_id', id)
      .single();
    if (error) {
      console.error('Error fetching campaign:', error);
      setError(error);
    } else {
      setTitle(data.campaign_name);
      setAmount(data.campaign_amount);
      setCurrency(data.campaign_currency);
      setStartDate(data.start_date.split('T')[0]);
      setEndDate(data.completed_date.split('T')[0]);
      setAPR(data.APR);
      setAssetClass(data.asset_class);
      setSelectedPartner(data.partner_id);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchPartners();
    fetchCampaign();
    window.scrollTo(0, 0); // Scroll to the top when the component mounts
  }, [fetchCampaign, fetchPartners]);

  const handleSubmit = async e => {
    e.preventDefault();
    const { error } = await supabase
      .from('campaign')
      .update({
        campaign_name: title,
        campaign_amount: amount,
        campaign_currency: currency,
        start_date: startDate,
        completed_date: endDate,
        APR,
        asset_class: assetClass,
        partner_id: selectedPartner,
      })
      .eq('campaign_id', id);
    if (error) {
      console.error('Error updating campaign:', error);
      setError(error);
      toast({
        title: 'Error',
        description: 'There was an error updating the campaign.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } else {
      navigate('/admin');
      toast({
        title: 'Success',
        description: 'Campaign updated successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleCancel = () => {
    navigate(-1); // Navigate to the previous page
  };

  if (loading) {
    return (
      <AdminLayout>
        <Flex justify="center" align="center" minHeight="calc(100vh - 60px)">
          <Spinner size="xl" />
        </Flex>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <Flex justify="center" align="center" minHeight="calc(100vh - 60px)">
          <Alert status="error">
            <AlertIcon />
            {error.message}
          </Alert>
        </Flex>
      </AdminLayout>
    );
  }

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
                Update Campaign
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

export default EditCampaign;
