import React from 'react';
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
  Text,
  Grid,
  Image,
} from '@chakra-ui/react';

export default function SignIn() {
  return (
    <Grid
      minHeight={{ base: '100%', md: '100vh' }}
      templateColumns={{ base: 'repeat(1, 1fr)' }} // 1 column on base, 2 columns from md up
      templateRows="1fr"
      templateAreas={{
        base: `"form"`,
        md: `"image form"`,
      }}
      position="relative"
    >
      <Box
        gridArea="image"
        bgImage="url('signin_ship.jpg')"
        bgSize="cover"
        bgPosition="center"
        display={{ base: 'none', md: 'block' }} // Hide on base, show on md and up
      />
      <Flex w="100%" alignItems="center" direction="column">
        <Flex
          gridArea="form"
          direction="column"
          alignItems="center"
          justifyContent="center"
          overflow="auto"
          height="100vh"
          w={{ base: '100%', md: '560px' }}
        >
          <Box
            p="16px"
            m={{ base: '0px', md: '20px' }}
            boxShadow="lg"
            shadow="none"
            w={{ base: '100%', md: '432px' }}
          >
            <Image src="BorderDollarFullLogo.jpeg" w="400px"></Image>
            <Heading size="md" pt="10px" pb="10px" mt="16px" mb="16px">
              Sign in to start fueling global trade
            </Heading>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input placeholder="Enter your email" />
            </FormControl>
            <Checkbox defaultIsChecked mt={4}>
              Remember me
            </Checkbox>
            <Button width="full" mt={4}>
              Sign In
            </Button>
            <Button
              alignItems="center"
              borderColor="orange.300"
              bg="white"
              color="blue.500"
              width="full"
              borderWidth="1px"
              mt={6}
              leftIcon={
                <img
                  src="GoogleGLogo.svg"
                  alt="Google Icon"
                  style={{ width: '20px' }}
                />
              }
            >
              Log In with Google
            </Button>
            <Text mt={6}>Don't have an account yet?</Text>
            <Button
              borderColor="orange.300"
              bg="white"
              color="blue.500"
              width="full"
              borderWidth="1px"
              mt={2}
            >
              Sign Up Here
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Grid>
  );
}
