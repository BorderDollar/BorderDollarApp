import React from 'react';
import { Box, Flex, Text, Button, IconButton, useDisclosure, Stack } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="blue.600" color="white" px={4} boxShadow="sm">
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <Text fontSize="lg" fontWeight="bold">
          My App
        </Text>
        <Flex alignItems={'center'}>
          <Stack direction={'row'} spacing={7} display={{ base: 'none', md: 'flex' }}>
            {/* Define your navigation links here */}
            <Button as="a" href="/pools" variant="link" color="white">
              Pools
            </Button>
            <Button as="a" href="/portfolio" variant="link" color="white">
              Portfolio
            </Button>
            {/* Add more navigation links if needed */}
          </Stack>
          <Button colorScheme="blue" variant="outline" ml={4}>
            Connect
          </Button>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {/* Repeat your navigation links here for mobile */}
            <Button as="a" href="/pools" variant="link" color="white">
              Pools
            </Button>
            <Button as="a" href="/portfolio" variant="link" color="white">
              Portfolio
            </Button>
            {/* Add more navigation links if needed */}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Header;
