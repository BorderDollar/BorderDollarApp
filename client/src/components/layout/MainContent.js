import React from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import PoolsList from '../pools/PoolsList';
// You may need additional imports depending on your content

const samplePoolsData = [
  {
    name: 'Anemoy Liquid Treasury Fund 1',
    assetClass: 'US Treasuries',
    valueLocked: '4,608,059 USDC',
    apr: '5.0%',
    status: 'Open for investments',
  },
  {
    name: 'New Silver Series 3',
    assetClass: 'Real Estate Bridge',
    valueLocked: 'N/A',
    apr: '8.0%',
    status: 'Upcoming',
  },
  {
    name: 'BlockTower Series 4',
    assetClass: 'Structured Credit',
    valueLocked: '97,515,862 DAI',
    apr: '4.0%',
    status: 'Maker Pool',
  },
  {
    name: 'BlockTower Series 3',
    assetClass: 'Structured Credit',
    valueLocked: '89,680,937 DAI',
    apr: '4.0%',
    status: 'Maker Pool',
  },
  {
    name: 'New Silver Series 2',
    assetClass: 'Real Estate Bridge Loans',
    valueLocked: '69,680,937 DAI',
    apr: '2.0%',
    status: 'Maker Pool',
  },
  {
    name: 'ALT 1.0 SPV',
    assetClass: 'Invoice Financing',
    valueLocked: '680,937 DAI',
    apr: '5.0%',
    status: 'Open for investments',
  },
  {
    name: 'BlockTower Series 1',
    assetClass: 'Whole Loans',
    valueLocked: '0 DAI',
    apr: '4.0%',
    status: 'Maker Pool',
  },
  {
    name: 'BlockTower Series 2',
    assetClass: 'Debt Facilities',
    valueLocked: '0 DAI',
    apr: '4.0%',
    status: 'Maker Pool',
  },
];

const MainContent = () => {
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
          US$60,000
        </Text>
        {/* More content blocks go here */}
      </Box>
      <PoolsList pools={samplePoolsData} />
    </Flex>
  );
};

export default MainContent;
