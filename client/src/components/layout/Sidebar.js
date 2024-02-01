import React from 'react';
import { Box, VStack, HStack, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { FaHome, FaUser, FaCog } from 'react-icons/fa'; // Example icons from react-icons

const Sidebar = () => {
  // This will determine whether to show a vertical or horizontal stack based on the screen size
  const StackComponent = useBreakpointValue({ base: HStack, md: VStack });

  return (
    <Box
      as={StackComponent}
      spacing={4}
      align="stretch"
      position="fixed"
      p={4}
      left={0}
      right={0}
      bottom={{ base: 0, md: 'auto' }}
      top={{ md: 0 }}
      width={{ md: "220px" }}
      height={{ md: "100vh" }}
      bg="blue.500"
      color="white"
      zIndex="docked"
      justifyContent={{ base: "space-around", md: "flex-start" }} // Spread items on mobile, stack at the start on desktop
      borderTopWidth={{ base: "1px", md: 0 }}
      borderTopColor={{ base: "gray.200", md: "transparent" }}
    >
      {/* Your sidebar content, which will now adjust based on the breakpoint */}
      <IconButton aria-label="Home" icon={<FaHome />} />
      <IconButton aria-label="Profile" icon={<FaUser />} />
      <IconButton aria-label="Settings" icon={<FaCog />} />
      {/* More items... */}
    </Box>
  );
};

export default Sidebar;
