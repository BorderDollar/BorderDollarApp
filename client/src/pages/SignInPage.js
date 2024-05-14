import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Grid,
  Image,
  useToast,
  Checkbox,
} from '@chakra-ui/react';
import { supabase } from '../api/supabaseClient';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [emailSent, setEmailSent] = useState(false); // New state to track if the email link was sent
  const toast = useToast();

  const handleMagicLinkSignIn = async e => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: process.env.REACT_APP_SUPABASE_REDIRECT_URL,
      },
    });

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } else {
      setEmailSent(true);
      toast({
        title: 'Check your email',
        description: 'A magic BorderDollar link has been sent to your email address. You may close this tab now.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
    });

    if (error) {
      toast({
        title: 'Error logging in with Google',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } else {
      setEmailSent(true);
      toast({
        title: 'Google Login Successful',
        description: 'You have successfully logged in with Google.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const toggleSignUp = () => {
    setIsSigningUp(!isSigningUp);
    setEmailSent(false);
  };

  return (
    <Grid
      minHeight={{ base: '100%', md: '100vh' }}
      templateColumns={{ base: 'repeat(1, 1fr)' }}
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
        display={{ base: 'none', md: 'block' }}
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
            {emailSent ? (
              <Flex direction="column" align="center">
                <Text fontSize="lg" mt="20px">
                  {email}
                </Text>
                <Text mt="16px">
                  Check your email, and click on the link to log in! 
                  <br></br>
                  <b>You may close this tab now.</b>
                </Text>
              </Flex>
            ) : (
              <>
                <Heading size="md" pt="10px" pb="10px" mt="16px" mb="16px">
                  {isSigningUp
                    ? 'Sign up to start fueling global trade'
                    : 'Sign in to start fueling global trade'}
                </Heading>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </FormControl>
                {!isSigningUp && (
                  <Checkbox  mt={4}>
                    Remember me
                  </Checkbox>
                )}
                <Button width="full" mt={4} onClick={handleMagicLinkSignIn}>
                  {isSigningUp ? 'Sign Up' : 'Sign In'}
                </Button>
                <Button
                  onClick={handleGoogleLogin}
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
                  {isSigningUp ? 'Sign Up with Google' : 'Log In with Google'}
                </Button>
                <Text mt={6}>
                  {isSigningUp
                    ? 'Already have an account?'
                    : "Don't have an account yet?"}
                </Text>
                <Button
                  borderColor="orange.300"
                  bg="white"
                  color="blue.500"
                  width="full"
                  borderWidth="1px"
                  mt={2}
                  onClick={toggleSignUp}
                >
                  {isSigningUp ? 'Sign In Here' : 'Sign Up Here'}
                </Button>
              </>
            )}
          </Box>
        </Flex>
      </Flex>
    </Grid>
  );
}
