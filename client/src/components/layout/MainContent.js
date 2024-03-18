import React from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import PoolsList from '../pools/PoolsList';
import placeholderPoolData from '../../data/placeholderData'; 
// You may need additional imports depending on your content

const MainContent = () => {
  const poolDataArray = Object.values(placeholderPoolData);

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
          Pools
        </Heading>
        <Text fontSize="lg">Pools and tokens of real-world assets</Text>
      </Flex>
      <Box
        p={5}
        shadow="md"
        borderWidth="1px"
        borderRadius="md"
        mb={4} // Margin bottom for spacing between content blocks
      >
        {/* Content block for Total value locked (TVL) */}
        <Heading fontSize="lg">Total Invoice Value</Heading>
        <Text fontSize="3xl" mt={1}>
          US$151,000
        </Text>
        {/* More content blocks go here */}
      </Box>
      <PoolsList pools={ poolDataArray } />
    </Flex>
  );
};

export default MainContent;
