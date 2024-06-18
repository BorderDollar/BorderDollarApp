import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  VStack,
  Spinner,
  Alert,
  AlertIcon,
  useToast,
  Flex,
  HStack,
  Heading,
  Text,
  FormControl,
  FormLabel,
  FormHelperText,
  Image,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../api/supabaseClient';
import AdminLayout from '../../components/layout/AdminLayout';
import { formatNumberWithCommas } from '../../utils/formatNumber';
import sorobanContractDeploy from '../../smartContractUtils/soroban/sorobanContractDeploy';

const DeployCampaign = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [APR, setAPR] = useState('');
  const [assetClass, setAssetClass] = useState('');
  const [selectedProtocol, setSelectedProtocol] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

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
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchCampaign();
    window.scrollTo(0, 0); // Scroll to the top when the component mounts
  }, [fetchCampaign]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!selectedProtocol) {
      toast({
        title: 'Error',
        description: 'Please select a protocol.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    let newContract = null;

    if (selectedProtocol === 'Stellar') {
      try {
        const deployer = process.env.REACT_APP_SOROBAN_BORDERDOLLAR_PUBLIC_KEY;
        const wasmHash =
          process.env.REACT_APP_SOROBAN_CROWDFUNDING_SMART_CONTRACT_HASH;
        newContract = await sorobanContractDeploy(deployer, wasmHash);

        console.log('New contract code is', newContract);

        toast({
          title: 'Success',
          description: 'Smart contract deployed successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Error deploying smart contract:', error);
        toast({
          title: 'Error',
          description: 'There was an error deploying the smart contract.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }
    }

    const { error } = await supabase
      .from('campaign')
      .update({
        status: 'Open for Investments',
        protocol: selectedProtocol,
        smart_contract: newContract,
      })
      .eq('campaign_id', id);
    if (error) {
      console.error('Error deploying campaign:', error);
      setError(error);
      toast({
        title: 'Error',
        description: 'There was an error deploying the campaign.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } else {
      navigate('/admin');
      toast({
        title: 'Success',
        description: 'Campaign deployed successfully.',
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
          <Heading as="h3" size="lg" mb={6}>
            Deploy Campaign
          </Heading>
          <VStack spacing={4} align="flex-start">
            <Text fontSize="lg">Title: {title}</Text>
            <Text fontSize="lg">
              Amount: {currency}
              {formatNumberWithCommas(amount)}
            </Text>
            <Text fontSize="lg">Start Date: {startDate}</Text>
            <Text fontSize="lg">End Date: {endDate}</Text>
            <Text fontSize="lg">APR: {APR}%</Text>
            <Text fontSize="lg">Asset Class: {assetClass}</Text>

            <FormControl id="protocol" isRequired>
              <FormLabel>Select Protocol</FormLabel>
              <HStack spacing={4}>
                <Button
                  onClick={() => setSelectedProtocol('None')}
                  variant={selectedProtocol === 'None' ? 'solid' : 'outline'}
                >
                  <Image
                    src="https://mskkwpvdnbtjtuvxzvez.supabase.co/storage/v1/object/public/public_images/noneprotocol.png"
                    alt="Vanilla"
                    boxSize="40px"
                  />
                </Button>
                <Button
                  onClick={() => setSelectedProtocol('Stellar')}
                  variant={selectedProtocol === 'Stellar' ? 'solid' : 'outline'}
                >
                  <Image
                    src="https://mskkwpvdnbtjtuvxzvez.supabase.co/storage/v1/object/public/public_images/stellar-xlm-logo.png"
                    alt="Stellar"
                    boxSize="40px"
                  />
                </Button>
              </HStack>
              <FormHelperText>
                Select the protocol for the campaign deployment.
              </FormHelperText>
            </FormControl>

            <HStack spacing={4}>
              <Button type="submit" colorScheme="orange" size="lg">
                Deploy Campaign
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

export default DeployCampaign;
