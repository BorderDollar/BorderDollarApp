import React from 'react';
import {
  Flex,
  Button,
  Box,
  Image,
  Spacer,
  useDisclosure,
  useBreakpointValue,
} from '@chakra-ui/react';
import ConnectModal from './ConnectModal';

const Header = () => {
  const logoPath = '/BorderDollarFullLogo.jpeg'; // Replace with the actual path to your logo
  const headerHeight = useBreakpointValue({ base: '60px', md: '60px' }); // Consistent height on all screens
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        as="header"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        h={headerHeight}
        bg="white"
        color="white"
        px={{ base: 1, md: 6 }}
        position="fixed"
        zIndex="banner"
        top={0}
        left={0}
      >
        {/* Logo */}
        <Box display={{ base: 'block', md: 'none' }} flexShrink={0} h="100%">
          <Image src={logoPath} maxH="full" objectFit="contain" />
        </Box>

        {/* Spacer to push the connect button to the right */}
        <Spacer />

        {/* Connect Button */}
        <Button
          colorScheme="orange"
          variant="solid"
          size="md"
          maxHeight="100%"
          w={{ base: '130px', md: '262px' }}
          h="31px"
          onClick={onOpen}
        >
          Connect
        </Button>
      </Flex>

      <ConnectModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Header;
