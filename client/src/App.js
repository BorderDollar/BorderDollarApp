import React from 'react';
import {
  ChakraProvider,
} from '@chakra-ui/react';
import SignIn from './components/SignIn'
import theme from './theme/theme.js'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <SignIn />
    </ChakraProvider>
  );
}

export default App;
