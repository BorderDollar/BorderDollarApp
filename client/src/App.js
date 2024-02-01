import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import SignIn from './pages/SignInPage.js';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import theme from './theme/theme.js';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<Navigate replace to="/signin" />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;