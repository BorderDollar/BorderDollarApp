import React, { useState, useEffect, useCallback } from 'react';
import {
  Flex,
  Text,
  VStack,
  Heading,
  Divider,
  Spinner,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { supabase } from '../../api/supabaseClient';

const PoolDetails = ({ poolId }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('');
  const [assetClass, setAssetClass] = useState('');
  const [status, setStatus] = useState('');
  const [APR, setAPR] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCampaign = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('campaign')
      .select('*')
      .eq('campaign_id', poolId)
      .single();
    if (error) {
      console.error('Error fetching campaign:', error);
      setError(error);
    } else {
      setTitle(data.campaign_name);
      setAmount(data.campaign_amount);
      setCurrency(data.campaign_currency);
      setAssetClass(data.asset_class);
      setStatus(data.status);
      setAPR(data.APR);
    }
    setLoading(false);
  }, [poolId]);

  useEffect(() => {
    fetchCampaign();
  }, [fetchCampaign]);

  return (
    <Flex
      direction="column"
      minHeight="calc(100vh - 60px)"
      transition="margin 0.2s ease-out"
      gap="24px"
      pt={{ base: '80px', md: '0px' }}
      pb={{ base: '30px', md: '0px' }}
    >
      {loading ? (
        <Spinner size="xl" />
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          {error.message}
        </Alert>
      ) : (
        <>
          <Flex direction="column">
            <Heading as="h1" size={{ base: 'md', md: 'lg' }} w="100%">
              {title}
            </Heading>
            <Text fontSize="lg">{assetClass}</Text>
          </Flex>
          <Divider />
          <VStack align="stretch" spacing={4}>
            <Flex justify="space-between">
              <Text fontSize="md" fontWeight="bold">
                Amount:
              </Text>
              <Text fontSize="md">
                {currency}
                {amount}
              </Text>
            </Flex>
            <Flex justify="space-between">
              <Text fontSize="md" fontWeight="bold">
                APR:
              </Text>
              <Text fontSize="md">{APR}%</Text>
            </Flex>
            <Flex justify="space-between">
              <Text fontSize="md" fontWeight="bold">
                Status:
              </Text>
              <Text fontSize="md">{status}</Text>
            </Flex>
          </VStack>
        </>
      )}
    </Flex>
  );
};

export default PoolDetails;
