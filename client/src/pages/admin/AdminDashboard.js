import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  HStack,
  Spinner,
  Alert,
  AlertIcon,
  useBreakpointValue,
  Grid,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../api/supabaseClient';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';

const AdminDashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [totalInvoiceValue, setTotalInvoiceValue] = useState(0);

  useEffect(() => {
    fetchCampaigns();
    fetchTotalInvoiceValue();
  }, []);

  const fetchCampaigns = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('campaign').select('*');
    if (error) {
      console.error('Error fetching campaigns:', error);
      setError(error);
    } else {
      setCampaigns(data);
    }
    setLoading(false);
  };

  const handleDelete = async id => {
    const { error } = await supabase
      .from('campaign')
      .delete()
      .eq('campaign_id', id);
    if (error) {
      console.error('Error deleting campaign:', error);
      setError(error);
    } else {
      fetchCampaigns();
    }
  };

  const formatNumberWithCommas = number => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const fetchTotalInvoiceValue = async () => {
    const { data, error } = await supabase.rpc('get_total_invoice_value');
    if (error) {
      console.error('Error fetching total invoice value:', error);
      setError(error);
    } else {
      setTotalInvoiceValue(data);
    }
  };

  const MainContent = () => (
    <Flex
      direction="column"
      minHeight="calc(100vh - 60px)"
      gap="24px"
      pt={{ base: '80px', md: '0px' }}
      pb={{ base: '30px', md: '0px' }}
    >
      <Flex direction="column">
        <Heading as="h1" size={{ base: 'md', md: 'lg' }} w="100%">
          Admin Dashboard
        </Heading>
        <Text fontSize="lg">Manage your campaigns and monitor metrics</Text>
      </Flex>

      <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" mb={4}>
        <Heading fontSize="lg">Total Financing Value</Heading>
        <Text fontSize="3xl" mt={1}>
          US${formatNumberWithCommas(totalInvoiceValue)}
        </Text>
      </Box>

      <HStack spacing={6} w="full">
        <Box
          flex="1"
          p={6}
          bg="white"
          shadow="md"
          borderWidth="1px"
          borderRadius="md"
        >
          <Text fontSize="2xl" fontWeight="bold">
            US${formatNumberWithCommas(20000)}
          </Text>
          <Text color="gray.500">Outstanding Balance</Text>
        </Box>
        <Box
          flex="1"
          p={6}
          bg="white"
          shadow="md"
          borderWidth="1px"
          borderRadius="md"
        >
          <Text fontSize="2xl" fontWeight="bold">
            US${formatNumberWithCommas(10000000)}
          </Text>
          <Text color="gray.500">Total Loans Funded</Text>
        </Box>
        <Box
          flex="1"
          p={6}
          bg="white"
          shadow="md"
          borderWidth="1px"
          borderRadius="md"
        >
          <Text fontSize="2xl" fontWeight="bold">
            US${formatNumberWithCommas(9500000)}
          </Text>
          <Text color="gray.500">Total Repayments</Text>
        </Box>
        <Box
          flex="1"
          p={6}
          bg="white"
          shadow="md"
          borderWidth="1px"
          borderRadius="md"
        >
          <Text fontSize="2xl" fontWeight="bold">
            US${formatNumberWithCommas(500000)}
          </Text>
          <Text color="gray.500">Total Interest Earned</Text>
        </Box>
      </HStack>

      <Flex justify="space-between" align="center" mt={8}>
        <Heading as="h3" size="lg">
          Campaigns
        </Heading>
        <Button onClick={() => navigate('/admin/create')}>
          Create Campaign
        </Button>
      </Flex>

      {loading ? (
        <Spinner size="xl" />
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          {error.message}
        </Alert>
      ) : (
        <Table variant="simple" mt={4}>
          <Thead>
            <Tr>
              <Th>Campaign Name</Th>
              <Th>Amount</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {campaigns.map(campaign => (
              <Tr key={campaign.campaign_id}>
                <Td>{campaign.campaign_name}</Td>
                <Td>
                  {campaign.campaign_currency}
                  {formatNumberWithCommas(campaign.campaign_amount)}
                </Td>
                <Td>
                  <Button
                    mr={2}
                    onClick={() =>
                      navigate(`/admin/edit/${campaign.campaign_id}`)
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => handleDelete(campaign.campaign_id)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Flex>
  );

  return isMobile ? (
    <Flex direction="column" h="100vh">
      <Box>
        <Header />
      </Box>
      <Box flex="1" p={4}>
        <MainContent />
      </Box>
      <Box p={4}>
        <Sidebar />
      </Box>
    </Flex>
  ) : (
    <Grid templateColumns="220px 1fr" templateRows="60px 1fr" h="100vh">
      <Box gridRow="1 / 3" gridColumn="1">
        <Sidebar />
      </Box>
      <Box gridRow="1" gridColumn="2">
        <Header />
      </Box>
      <Box gridRow="2" gridColumn="2" px={{ base: '16px', md: '24px' }} pb={2}>
        <MainContent />
      </Box>
    </Grid>
  );
};

export default AdminDashboard;
