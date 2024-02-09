import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import SignIn from './pages/SignInPage'; 
import PoolsPage from './pages/PoolsPage';
import PoolDetailPage from './pages/PoolDetailPage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import theme from './theme/theme'; 

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/pools" element={<PoolsPage />} />
          <Route path="/" element={<Navigate replace to="/signin" />} />
          <Route path="/pools/:poolId" element={<PoolDetailPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
