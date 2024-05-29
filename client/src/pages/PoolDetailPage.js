import React from 'react';
import { Box, Flex, useBreakpointValue, Grid } from '@chakra-ui/react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import { useParams } from 'react-router-dom';
import PoolDetails from '../components/pools/PoolDetails';

const PoolDetailPage = () => {
  const { poolId } = useParams();
  const isMobile = useBreakpointValue({ base: true, md: false });

  return isMobile ? (
    <Flex direction="column" h="100vh">
      <Box>
        <Header />
      </Box>
      <Box flex="1" p={4}>
        <PoolDetails poolId={poolId} />
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
        <PoolDetails poolId={poolId} />
      </Box>
    </Grid>
  );
};

export default PoolDetailPage;
