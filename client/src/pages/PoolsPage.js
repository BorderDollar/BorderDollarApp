import React from 'react';
import {
  Box,
  Flex,
  useBreakpointValue,
  useColorModeValue,
  Grid
} from '@chakra-ui/react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';

const PoolsPage = () => {
  const bg = useColorModeValue('gray.100', 'gray.900');
  const headerBg = useColorModeValue('blue.600', 'blue.900');

  // Determine if it's a mobile view
  const isMobile = useBreakpointValue({ base: true, md: false });

  return isMobile ? (
    // Mobile view with stacked layout
    <Flex direction="column" h="100vh">
      <Box bg={headerBg} >
        <Header />
      </Box>
      <Box flex="1" bg={bg} p={4}>
        {/* Your main content goes here */}
        Main Area
      </Box>
      {/* Sidebar is moved here for mobile view to be at the bottom */}
      <Box bg={bg} p={4}>
        <Sidebar />
      </Box>
    </Flex>
  ) : (
    // Desktop view with grid layout
    <Grid templateColumns="220px 1fr" templateRows="60px 1fr" h="100vh">
      <Box gridRow="1 / 3" gridColumn="1" bg={bg}>
        <Sidebar />
      </Box>
      <Box gridRow="1" gridColumn="2" bg={headerBg}>
        <Header />
      </Box>
      <Box gridRow="2" gridColumn="2" bg={bg} p={4}>
        {/* Your main content goes here */}
        Main Area
      </Box>
    </Grid>
  );
};

export default PoolsPage;
