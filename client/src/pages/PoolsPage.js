import React from 'react';
import { Box, Flex, useBreakpointValue, Grid } from '@chakra-ui/react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import MainContent from '../components/layout/MainContent';

const PoolsPage = () => {

  const isMobile = useBreakpointValue({ base: true, md: false });

  return isMobile ? (
    // Mobile view with stacked layout
    <Flex direction="column" h="100vh">
      <Box>
        <Header />
      </Box>
      <Box flex="1" p={4}>
        {/* Your main content goes here */}
        <MainContent />
      </Box>
      {/* Sidebar is moved here for mobile view to be at the bottom */}
      <Box p={4}>
        <Sidebar />
      </Box>
    </Flex>
  ) : (
    // Desktop view with grid layout
    <Grid templateColumns="220px 1fr" templateRows="60px 1fr" h="100vh">
      <Box gridRow="1 / 3" gridColumn="1">
        <Sidebar />
      </Box>
      <Box gridRow="1" gridColumn="2">
        <Header />
      </Box>
      <Box gridRow="2" gridColumn="2" px={{ base: '16px', md: '24px' }} pb={2}>
        {/* Your main content goes here */}
        <MainContent />
      </Box>
    </Grid>
  );
};

export default PoolsPage;
