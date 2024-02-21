import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Text, VStack, Heading, Divider } from '@chakra-ui/react';
import placeholderPoolData from '../../data/placeholderData'; // Adjust the import path as needed

const PoolDetails = () => {
  const { poolId } = useParams();
  const poolData = placeholderPoolData[poolId] || placeholderPoolData['12345']; // Fallback to a default ID if not found

  return (
    <VStack spacing={4} align="stretch">
      <Box
        p={5}
        shadow="md"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <Heading size="lg" mb={2}>
          {poolData.name}
        </Heading>
        <Divider my={4} />
        <Text fontSize="md">Asset Class: {poolData.assetClass}</Text>
        <Text fontSize="md">Value Locked: {poolData.valueLocked}</Text>
        <Text fontSize="md">
          Average Asset Maturity: {poolData.averageMaturity}
        </Text>
        {/* Render more pool details here */}
      </Box>
      {/* Add additional sections for the pool details page */}
    </VStack>
  );
};

export default PoolDetails;
