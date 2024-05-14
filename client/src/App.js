import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './auth/AuthContext';
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
import RequireAuth from './auth/RequireAuth'
import RedirectIfLoggedIn from './auth/RedirectIfLoggedIn'

function App() {
  return (
      <ChakraProvider theme={theme}>
          <Router>
              <AuthProvider>
                  <Routes>
                      <Route path="/signin" element={
                          <RedirectIfLoggedIn>
                              <SignIn />
                          </RedirectIfLoggedIn>
                      } />
                      <Route path="/pools" element={<RequireAuth><PoolsPage /></RequireAuth>} />
                      <Route path="/pools/:poolId" element={<RequireAuth><PoolDetailPage /></RequireAuth>} />
                      <Route path="/" element={<Navigate replace to="/signin" />} />
                  </Routes>
              </AuthProvider>
          </Router>
      </ChakraProvider>
  );
}

export default App;
