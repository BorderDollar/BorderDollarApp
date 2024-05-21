import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Header from './Header';
import Sidebar from './Sidebar';

const AdminLayout = ({ children }) => {
  return (
    <Flex direction="column" minHeight="100vh">
      <Header />
      <Flex flex="1" mt="60px"> {/* Adjust margin-top to match header height */}
        <Sidebar />
        <Box flex="1" p={4} ml={{ base: 0, md: '220px' }}> {/* Adjust margin-left to match sidebar width */}
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default AdminLayout;
