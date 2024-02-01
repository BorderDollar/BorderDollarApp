import React from 'react';
import { Flex, Button, Box, Image, Spacer, useBreakpointValue } from '@chakra-ui/react';

const Header = () => {
  const logoPath = '/BorderDollarFullLogo.jpeg'; // Replace with the actual path to your logo
  const headerHeight = useBreakpointValue({ base: '60px', md: '60px' }); // Consistent height on all screens

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      h={headerHeight}
      bg="blue.600"
      color="white"
      px={{base: 1, md: 6}}
      boxShadow="sm"
    >
      {/* Logo */}
      <Box display={{ base: 'block', md: 'none' }} flexShrink={0} h="100%">
        <Image src={logoPath} maxH="full" objectFit="contain" /> {/* Ensure the logo fits within the header */}
      </Box>
      
      {/* Spacer to push the connect button to the right */}
      <Spacer />

      {/* Connect Button */}
      <Button colorScheme="teal" variant="solid" size="md" maxHeight="100%">
        Connect
      </Button>
    </Flex>
  );
};

export default Header;
