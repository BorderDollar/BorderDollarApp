import React from 'react';
import {
  VStack,
  Grid,
  Text,
  Box,
  Badge,
  Flex,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const PoolsList = ({ pools }) => {
  // Determine if it's a mobile view
  const isMobile = useBreakpointValue({ base: false, md: true });

  // Define the grid template for consistency between the header and pool items
  const gridTemplateColumns = {
    base: 'repeat(1, 1fr)',
    md: '3.5fr 3fr 2fr 1fr 2.5fr',
  };

  return isMobile ? (
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
          as={RouterLink}
          to={`/pools/${pool.id}`}
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
            <Text isTruncated>{pool.assetClass}</Text>
            <Text isTruncated>{pool.valueLocked}</Text>
            <Text isTruncated>{pool.apr}</Text>
            <Flex isTruncated alignItems="center">
              <Badge
                isTruncated
                colorScheme={
                  pool.status === 'Open for investments' ? 'green' : 'orange'
                }
              >
                {pool.status}
              </Badge>
            </Flex>
          </Grid>
        </Box>
      ))}
    </VStack>
  ) : (
    <VStack spacing={2} align="stretch" w="full">
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
            <Text isTruncated>
              <b>Name:</b> {pool.name}
            </Text>
            <Text isTruncated>
              <b>Asset Class:</b> {pool.assetClass}
            </Text>
            <Text isTruncated>
              <b>Value Locked:</b> {pool.valueLocked}
            </Text>
            <Text isTruncated>
              <b>APR:</b> {pool.apr}
            </Text>
            <Flex isTruncated alignItems="center">
              <Badge
                isTruncated
                colorScheme={
                  pool.status === 'Open for investments' ? 'green' : 'orange'
                }
              >
                {pool.status}
              </Badge>
            </Flex>
          </Grid>
        </Box>
      ))}
    </VStack>
  );
};

export default PoolsList;
