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
  Spinner,
  Alert,
  AlertIcon,
  useBreakpointValue,
  Grid,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../api/supabaseClient';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';

const AdminDashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [partners, setPartners] = useState([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState(true);
  const [loadingPartners, setLoadingPartners] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [totalInvoiceValue, setTotalInvoiceValue] = useState(0);

  useEffect(() => {
    fetchCampaigns();
    fetchPartners();
    fetchTotalInvoiceValue();
  }, []);

  const fetchCampaigns = async () => {
    setLoadingCampaigns(true);
    const { data, error } = await supabase.from('campaign').select('*');
    if (error) {
      console.error('Error fetching campaigns:', error);
      setError(error);
    } else {
      setCampaigns(data);
    }
    setLoadingCampaigns(false);
  };

  const fetchPartners = async () => {
    setLoadingPartners(true);
    const { data, error } = await supabase.from('partner').select('*');
    if (error) {
      console.error('Error fetching partners:', error);
      setError(error);
    } else {
      setPartners(data);
    }
    setLoadingPartners(false);
  };

  const handleDeleteCampaign = async id => {
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

  const handleDeletePartner = async id => {
    const { error } = await supabase
      .from('partner')
      .delete()
      .eq('partner_id', id);
    if (error) {
      console.error('Error deleting partner:', error);
      setError(error);
    } else {
      fetchPartners();
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

  const CampaignsTab = () => (
    <Flex direction="column" gap="24px">
      <Flex justify="space-between" align="center" mt={8}>
        <Heading as="h3" size="lg">
          Campaigns
        </Heading>
        <Button onClick={() => navigate('/admin/create')}>
          Create Campaign
        </Button>
      </Flex>

      {loadingCampaigns ? (
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
                    onClick={() => handleDeleteCampaign(campaign.campaign_id)}
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

  const PartnersTab = () => (
    <Flex direction="column" gap="24px">
      <Flex justify="space-between" align="center" mt={8}>
        <Heading as="h3" size="lg">
          Partners
        </Heading>
        <Button onClick={() => navigate('/admin/create-partner')}>
          Create Partner
        </Button>
      </Flex>

      {loadingPartners ? (
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
              <Th>Partner Name</Th>
              <Th>Contact</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {partners.map(partner => (
              <Tr key={partner.partner_id}>
                <Td>{partner.company_name}</Td>
                <Td>{partner.company_contact}</Td>
                <Td>
                  <Button
                    mr={2}
                    onClick={() =>
                      navigate(`/admin/edit-partner/${partner.partner_id}`)
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => handleDeletePartner(partner.partner_id)}
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

      <SimpleGrid columns={{ base: 2, md: 2, lg: 4 }} spacing={6} mb={6}>
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
      </SimpleGrid>

      <Tabs variant="soft-rounded" colorScheme="orange" mt={8}>
        <TabList>
          <Tab>Campaigns</Tab>
          <Tab>Partners</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <CampaignsTab />
          </TabPanel>
          <TabPanel>
            <PartnersTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
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
