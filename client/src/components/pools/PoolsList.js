import React from 'react';
import { VStack, Grid, Text, Box } from '@chakra-ui/react';

const PoolsList = ({ pools }) => {
  // Define the grid template for consistency between the header and pool items
  const gridTemplateColumns = {
    base: 'repeat(1, 1fr)',
    md: '3fr 3fr 2fr 1fr 3fr',
  };

  return (
    <VStack spacing={2} align="stretch" w="full">
      {/* Header Row */}
      <Grid templateColumns={gridTemplateColumns} gap={4} px={5} py={2}>
        <Text fontWeight="bold">Name</Text>
        <Text fontWeight="bold">Asset Class</Text>
        <Text fontWeight="bold">Value Locked</Text>
        <Text fontWeight="bold">APR</Text>
        <Text fontWeight="bold">Status</Text>
      </Grid>

      {/* Pool Items */}
      {pools.map((pool, index) => (
        <Box
          key={index}
          borderWidth="1px"
          borderRadius="md"
          boxShadow="md"
          p={4}
          bg="white"
          w="full"
        >
          <Grid
            templateColumns={gridTemplateColumns}
            gap={4}
            alignItems="center"
          >
            {/* Ensure the box respects the grid's column width */}
            <Text isTruncated>{pool.name}</Text>
            <Text>{pool.assetClass}</Text>
            <Text>{pool.valueLocked}</Text>
            <Text>{pool.apr}</Text>
            <Text>{pool.status}</Text>
            {/* <Box>
              <Button size="sm" colorScheme="teal">
                Invest
              </Button>
            </Box> */}
          </Grid>
        </Box>
      ))}
    </VStack>
  );
};

export default PoolsList;
