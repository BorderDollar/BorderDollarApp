import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Flex,
  Text,
  Heading,
  Divider,
  Spinner,
  Alert,
  AlertIcon,
  Badge,
  Image,
  SimpleGrid,
} from '@chakra-ui/react';
import { supabase } from '../../api/supabaseClient';
import { useParams } from 'react-router-dom';

const PoolDetails = () => {
  const { poolId } = useParams();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('');
  const [assetClass, setAssetClass] = useState('');
  const [status, setStatus] = useState('');
  const [APR, setAPR] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [partner_name, setPartnerName] = useState('');
  const [partner_logo, setPartnerLogo] = useState('');
  const [partner_desc, setPartnerDesc] = useState('');

  const fetchCampaign = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('campaign')
      .select('*, partner:partner_id (company_name, logo_url, company_description)')
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

      setPartnerName(data.partner.company_name);
      setPartnerLogo(data.partner.logo_url);
      setPartnerDesc(data.partner.company_description);
    }
    setLoading(false);
  }, [poolId]);

  useEffect(() => {
    fetchCampaign();
  }, [fetchCampaign]);

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error.message}
      </Alert>
    );
  }

  const formatNumberWithCommas = number => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <Box
      maxW="7xl"
      mx="auto"
      px={{ base: '0', md: '8' }}
      py={{ base: '16', md: '8' }}
    >
      <Flex
        direction="column"
        bg="white"
        p={6}
        rounded="md"
        shadow="md"
        borderWidth="1px"
        borderRadius="md"
      >
        <Flex alignItems="center" mb={6}>
          <Image boxSize="50px" src={partner_logo} alt={title} mr={4} />
          <Box>
            <Heading as="h1" size="lg">
              {title}
            </Heading>
            <Badge
              colorScheme={status === 'Open for investments' ? 'green' : 'red'}
            >
              {status}
            </Badge>
          </Box>
        </Flex>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={6}>
          <Box
            textAlign="center"
            p={3}
            bg="white"
            border="1px solid #e2e8f0"
            borderRadius="md"
          >
            <Text fontSize="lg" fontWeight="bold">
              {assetClass}
            </Text>
            <Text fontSize="md" color="gray.500">
              Asset type
            </Text>
          </Box>
          <Box
            textAlign="center"
            p={3}
            bg="white"
            border="1px solid #e2e8f0"
            borderRadius="md"
          >
            <Text fontSize="lg" fontWeight="bold">
              3 months
            </Text>
            <Text fontSize="md" color="gray.500">
              Asset maturity
            </Text>
          </Box>
          <Box
            textAlign="center"
            p={3}
            bg="white"
            border="1px solid #e2e8f0"
            borderRadius="md"
          >
            <Text fontSize="lg" fontWeight="bold">
              {APR} %
            </Text>
            <Text fontSize="md" color="gray.500">
              APY
            </Text>
          </Box>
          <Box
            textAlign="center"
            p={3}
            bg="white"
            border="1px solid #e2e8f0"
            borderRadius="md"
          >
            <Text fontSize="lg" fontWeight="bold">
              {currency}
              {formatNumberWithCommas(amount)}
            </Text>
            <Text fontSize="md" color="gray.500">
              Total Pool value
            </Text>
          </Box>
          <Box
            textAlign="center"
            p={3}
            bg="white"
            border="1px solid #e2e8f0"
            borderRadius="md"
          >
            <Text fontSize="lg" fontWeight="bold">
              United States Dollar Circle - USDC
            </Text>
            <Text fontSize="md" color="gray.500">
              Investment Token
            </Text>
          </Box>
        </SimpleGrid>
        <Divider mb={6} />
        <Heading as="h3" size="md" mb={4}>
          Asset Originator Details
        </Heading>
        <Flex alignItems="center" mb={4}>
          <Image boxSize="50px" src={partner_logo} alt={title} mr={4} />
          <Box>
            <Text fontSize="xl" fontWeight="bold">
              {title}
            </Text>
            <Text>{partner_name}</Text>{' '}
          </Box>
        </Flex>
        <Text mb={6}>
          {partner_desc}
        </Text>
      </Flex>
    </Box>
  );
};

export default PoolDetails;
