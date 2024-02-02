import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Button,
  Image,
  Divider,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FaTachometerAlt, FaBriefcase, FaBoxes } from 'react-icons/fa';

const Sidebar = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const logoPath = '/BorderDollarFullLogo.jpeg'; // Replace with the actual path to your logo

  // Conditional styles for mobile and desktop views
  const sidebarStyles = {
    position: isMobile ? 'fixed' : 'fixed',
    bottom: isMobile ? 0 : 'auto',
    p: isMobile ? 2 : 4,
    width: isMobile ? 'full' : '220px',
    height: isMobile ? '60px' : '100vh', // Height should be limited on mobile
    bg: isMobile ? 'white' : 'white',
    color: isMobile ? 'gray.700' : 'blue.500',
    zIndex: isMobile ? 'sticky' : 'docked',
    justifyContent: isMobile ? 'space-around' : 'flex-start',
    boxShadow: isMobile ? '0 -2px 10px rgba(0, 0, 0, 0.1)' : 'none', // Optional shadow for the mobile bottom bar
    left: isMobile ? '0' : 'none',
  };

  return (
    <Box {...sidebarStyles}>
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
          width="full"
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
          width="full"
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
          width="full"
          _hover={{ bg: 'blue.500', color: 'white' }}
          iconSpacing={4}
          fontSize={isMobile ? 'xs' : 'none'}
        >
          Misc
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
