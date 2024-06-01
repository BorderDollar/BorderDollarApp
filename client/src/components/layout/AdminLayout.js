import React from 'react';
import { Box, Flex, Grid, useBreakpointValue } from '@chakra-ui/react';
import Header from './Header';
import Sidebar from './Sidebar';

const AdminLayout = ({ children }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <>
      {isMobile ? (
        <Flex direction="column" h="100vh">
          <Box>
            <Header />
          </Box>
          <Box flex="1" p={4} py={{ base: '80px', md: '0px' }}>
            <Flex justify="center" align="center" minHeight="calc(100vh - 60px)">
              {children}
            </Flex>
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
            <Flex justify="center" align="center" minHeight="calc(100vh - 60px)">
            {children}
            </Flex>
          </Box>
        </Grid>
      )}
      </>
  );
};

export default AdminLayout;
