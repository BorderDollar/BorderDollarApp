import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Flex, Text, VStack, Heading, Divider } from '@chakra-ui/react';
import placeholderPoolData from '../../data/placeholderData'; // Adjust the import path as needed

const PoolDetails = () => {
  const { poolId } = useParams();
  const poolData = placeholderPoolData[poolId] || placeholderPoolData['12345']; // Fallback to a default ID if not found

  return (
    <Flex
      direction="column" // Stack the content vertically
      // Adjust the below properties according to your layout
      // bg="gray.50" // Light gray background
      minHeight="calc(100vh - 60px)" // Subtract header height from full viewport height
      transition="margin 0.2s ease-out" // Smooth transition for margin changes
      gap="24px"
      pt={{ base: '80px', md: '0px' }}
      pb={{ base: '30px', md: '0px' }}
    >
      <Flex direction="column">
        <Heading as="h1" size={{ base: 'md', md: 'lg' }} w="100%">
          {poolData.name}
        </Heading>
        <Text fontSize="lg">{poolData.assetClass}</Text>
      </Flex>
    </Flex>
  );
};

export default PoolDetails;
