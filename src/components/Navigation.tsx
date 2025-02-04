import React from 'react';
import { Box, Flex, Link } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <Box bg="gray.800" px={4} py={4}>
      <Flex justify="center" gap={6}>
        <Link
          as={NavLink}
          to="/"
          color="white"
          _hover={{ color: 'blue.300' }}
          _activeLink={{ color: 'blue.300' }}
        >
          Counter
        </Link>
        <Link
          as={NavLink}
          to="/form"
          color="white"
          _hover={{ color: 'blue.300' }}
          _activeLink={{ color: 'blue.300' }}
        >
          User Form
        </Link>
        <Link
          as={NavLink}
          to="/editor"
          color="white"
          _hover={{ color: 'blue.300' }}
          _activeLink={{ color: 'blue.300' }}
        >
          Rich Text Editor
        </Link>
      </Flex>
    </Box>
  );
};

export default Navigation;