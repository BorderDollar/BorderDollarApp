import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Spinner,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import PoolsList from '../pools/PoolsList';
import { supabase } from '../../api/supabaseClient';

const MainContent = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalInvoiceValue, setTotalInvoiceValue] = useState(0);

  useEffect(() => {
    fetchCampaigns();
    fetchTotalInvoiceValue();
  }, []);

  const fetchCampaigns = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('campaign').select('*').eq('status', 'Open for Investments');
    if (error) {
      console.error('Error fetching campaigns:', error);
      setError(error);
    } else {
      setCampaigns(data);
    }
    setLoading(false);
  };

  const formatNumberWithCommas = number => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const fetchTotalInvoiceValue = async () => {
    const { data, error } = await supabase.rpc('get_total_invoice_value');
    if (error) {
      console.error('Error fetching total invoice value:', error);
      setError(error);
      console.log(error);
    } else {
      setTotalInvoiceValue(data);
    }
  };

  return (
    <Flex
      direction="column"
      minHeight="calc(100vh - 60px)"
      transition="margin 0.2s ease-out"
      gap="24px"
      pt={{ base: '80px', md: '0px' }}
      pb={{ base: '30px', md: '0px' }}
    >
      <Flex direction="column">
        <Heading as="h1" size={{ base: 'md', md: 'lg' }} w="100%">
          Pools
        </Heading>
        <Text fontSize="lg">Pools and tokens of real-world assets</Text>
      </Flex>
      {loading ? (
        <Spinner size="xl" />
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          {error.message}
        </Alert>
      ) : (
        <>
          <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" mb={4}>
            <Heading fontSize="lg">Total Invoice Value</Heading>
            <Text fontSize="3xl" mt={1}>
              US${formatNumberWithCommas(totalInvoiceValue)}
            </Text>
          </Box>
          <PoolsList pools={campaigns} />
        </>
      )}
    </Flex>
  );
};

export default MainContent;
