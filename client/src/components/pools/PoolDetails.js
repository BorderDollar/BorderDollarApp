import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';

const PoolDetails = ({ poolId }) => {
  // Fetch pool data based on poolId, or receive it as a prop
  
  return (
    <VStack spacing={4} align="stretch">
      <Box borderWidth="1px" borderRadius="md" boxShadow="md" p={5}>
        {/* Display the details of the pool */}
        <Text>Pool ID: {poolId}</Text>
        {/* More details */}
      </Box>
    </VStack>
  );
};

export default PoolDetails;
