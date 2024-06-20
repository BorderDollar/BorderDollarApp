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
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  useBreakpointValue,
} from '@chakra-ui/react';
import { supabase } from '../../api/supabaseClient';
import { useParams } from 'react-router-dom';
import InvestModal from '../layout/InvestModal';

const PoolDetails = () => {
  const { poolId } = useParams();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('');
  const [assetClass, setAssetClass] = useState('');
  const [status, setStatus] = useState('');
  const [APR, setAPR] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [partner_name, setPartnerName] = useState('');
  const [partner_logo, setPartnerLogo] = useState('');
  const [partner_desc, setPartnerDesc] = useState('');

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const fetchCampaign = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('campaign')
      .select(
        '*, partner:partner_id (company_name, logo_url, company_description)'
      )
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
      setStartDate(data.start_date);
      setEndDate(data.completed_date);

      setPartnerName(data.partner.company_name);
      setPartnerLogo(data.partner.logo_url);
      setPartnerDesc(data.partner.company_description);
    }
    setLoading(false);
  }, [poolId]);

  useEffect(() => {
    fetchCampaign();
  }, [fetchCampaign]);

  const formatNumberWithCommas = number => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const extractDate = timestamp => {
    return timestamp.split('T')[0];
  };

  const mockTransactions = [
    {
      type: 'Purchase',
      date: '2024-06-11',
      asset: '912797LK1',
      amount: '1,000,586.75 USD',
    },
    {
      type: 'Cash transfer',
      date: '2024-06-07',
      asset: 'Onchain reserve -> Settlement Account',
      amount: '1,000,000.00 USD',
    },
    {
      type: 'Deposit from investments',
      date: '2024-06-07',
      asset: 'Onchain reserve',
      amount: '1,000,000.00 USD',
    },
    {
      type: 'Purchase',
      date: '2024-06-07',
      asset: '912797LD7',
      amount: '1,133,487.55 USD',
    },
    {
      type: 'Principal payment',
      date: '2024-06-06',
      asset: '912797HT7 -> Settlement Account',
      amount: '1,125,700.00 USD',
    },
    {
      type: 'Purchase',
      date: '2024-05-18',
      asset: '912797LD7',
      amount: '999,836.00 USD',
    },
    {
      type: 'Cash transfer',
      date: '2024-05-17',
      asset: 'Onchain reserve -> Settlement Account',
      amount: '1,000,000.00 USD',
    },
    {
      type: 'Deposit from investments',
      date: '2024-05-17',
      asset: 'Onchain reserve',
      amount: '1,000,000.00 USD',
    },
  ];

  const tablePadding = useBreakpointValue({ base: 2, md: 4 });

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

  const campaignDetails = {
    title,
    amount,
    currency,
    assetClass,
    APR,
    startDate,
    endDate,
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
        <SimpleGrid columns={{ base: 2, md: 2, lg: 4 }} spacing={6} mb={6}>
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
              USDC (Stellar)
            </Text>
            <Text fontSize="md" color="gray.500">
              Investment Token
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
              {extractDate(startDate)}
            </Text>
            <Text fontSize="md" color="gray.500">
              Start Date
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
              {extractDate(endDate)}
            </Text>
            <Text fontSize="md" color="gray.500">
              End Date
            </Text>
          </Box>
        </SimpleGrid>

        <Divider mb={6} />

        {/* Call to Action Bar */}
        <Flex
          justifyContent="center"
          alignItems="center"
          bg="blue.50"
          p={6}
          mb={6}
          borderRadius="md"
          borderWidth="1px"
          borderColor="blue.100"
        >
          <Text fontSize="xl" fontWeight="bold" mr={4}>
            Ready to invest in this campaign?
          </Text>
          <Button colorScheme="blue" size="lg" onClick={onOpen}>
            Invest Now
          </Button>
        </Flex>
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
        <Text mb={6}>{partner_desc}</Text>

        <Divider mb={6} />

        <Heading as="h3" size="md" mb={4}>
          Transaction History
        </Heading>
        <Box overflowX="auto">
          <Table variant="simple" size="sm">
            <Thead bg="gray.200">
              <Tr>
                <Th p={tablePadding}>Type</Th>
                <Th p={tablePadding}>Transaction date</Th>
                <Th p={tablePadding}>Asset</Th>
                <Th p={tablePadding}>Amount</Th>
                <Th p={tablePadding}>View transaction</Th>
              </Tr>
            </Thead>
            <Tbody>
              {mockTransactions.map((transaction, index) => (
                <Tr key={index}>
                  <Td p={tablePadding}>
                    <Badge colorScheme="blue">{transaction.type}</Badge>
                  </Td>
                  <Td p={tablePadding}>{transaction.date}</Td>
                  <Td p={tablePadding}>{transaction.asset}</Td>
                  <Td p={tablePadding}>{transaction.amount}</Td>
                  <Td p={tablePadding}>
                    <Link href="#" color="teal.500">
                      View
                    </Link>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Flex>

      {/* Investment Modal */}
      <InvestModal
        isOpen={isOpen}
        onClose={onClose}
        campaignDetails={campaignDetails}
      />
    </Box>
  );
};

export default PoolDetails;
