import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Button,
  Image,
  Divider,
  Flex,
  Spacer,
  useBreakpointValue,
} from '@chakra-ui/react';
import {
  FaTachometerAlt,
  FaBriefcase,
  FaBoxes,
  FaSignOutAlt,
} from 'react-icons/fa';
import { supabase } from '../../api/supabaseClient';

const Sidebar = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const logoPath = '/BorderDollarFullLogo.jpeg'; // Replace with the actual path to your logo

  // Function to handle log out
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error logging out:', error.message);
    else console.log('Logged out successfully');
    // Redirect to login page or perform any other action after logout
  };

  // Conditional styles for mobile and desktop views
  const sidebarStyles = {
    position: 'fixed',
    bottom: isMobile ? 0 : 'auto',
    p: isMobile ? 2 : 4,
    width: isMobile ? 'full' : '220px',
    height: isMobile ? '60px' : '100vh', // Height should be limited on mobile
    bg: 'white',
    color: isMobile ? 'gray.700' : 'blue.500',
    zIndex: isMobile ? 'sticky' : '99999',
    justifyContent: isMobile ? 'space-around' : 'flex-start',
    boxShadow: isMobile ? '0 -2px 10px rgba(0, 0, 0, 0.1)' : 'none', // Optional shadow for the mobile bottom bar
    left: isMobile ? '0' : 'none',
  };

  return (
    <Flex {...sidebarStyles} flexDirection="column">
      <Box>
        {!isMobile && (
          <>
            <Box p={4}>
              <Image src={logoPath} height="60px" objectFit="contain" />
            </Box>
            <Divider borderColor="gray.200" />
          </>
        )}

        {/* The actual stack of buttons */}
        <Box as={isMobile ? HStack : VStack} spacing={4} pt={isMobile ? 0 : 6}>
          {/* Dashboard Button */}
          <Button
            leftIcon={<FaTachometerAlt />}
            variant="ghost"
            justifyContent="flex-start"
            width={isMobile ? 'auto' : 'full'}
            _hover={{ bg: 'blue.500', color: 'white' }}
            iconSpacing={4}
            fontSize={isMobile ? 'xs' : 'none'}
          >
            Dashboard
          </Button>

          {/* Portfolio Button */}
          <Button
            leftIcon={<FaBriefcase />}
            variant="ghost"
            justifyContent="flex-start"
            width={isMobile ? 'auto' : 'full'}
            _hover={{ bg: 'blue.500', color: 'white' }}
            iconSpacing={4}
            fontSize={isMobile ? 'xs' : 'none'}
          >
            Portfolio
          </Button>

          {/* Misc Button */}
          <Button
            leftIcon={<FaBoxes />}
            variant="ghost"
            justifyContent="flex-start"
            width={isMobile ? 'auto' : 'full'}
            _hover={{ bg: 'blue.500', color: 'white' }}
            iconSpacing={4}
            fontSize={isMobile ? 'xs' : 'none'}
          >
            Misc
          </Button>

          {!isMobile && <Spacer flex="1" />}

          {/* Log out Button */}
          <Button
            leftIcon={<FaSignOutAlt />}
            variant="ghost"
            justifyContent="flex-start"
            width={isMobile ? 'auto' : 'full'}
            _hover={{ bg: 'red.500', color: 'white' }}
            iconSpacing={4}
            fontSize={isMobile ? 'xs' : 'none'}
            mb={isMobile ? 0 : 4}
            onClick={handleLogout}
          >
            Log out
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default Sidebar;
