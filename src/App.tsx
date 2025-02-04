import React from 'react';
import { ChakraProvider, Box, Grid, GridItem } from '@chakra-ui/react';
import Counter from './components/Counter';
import UserForm from './components/UserForm';
import RichTextEditor from './components/RichTextEditor';

function App() {
  return (
    <ChakraProvider>
      <Box minH="100vh" bg="gray.900" p={8}>
        <Grid
          templateColumns="repeat(2, 1fr)"
          templateRows="repeat(2, auto)"
          gap={6}
          maxW="1200px"
          mx="auto"
        >
          <GridItem>
            <Box bg="gray.800" p={6} borderRadius="lg" border="1px" borderColor="gray.700">
              <Counter />
            </Box>
          </GridItem>
          <GridItem>
            <Box bg="gray.800" p={6} borderRadius="lg" border="1px" borderColor="gray.700">
              <RichTextEditor />
            </Box>
          </GridItem>
          <GridItem colSpan={2}>
            <Box bg="gray.800" p={6} borderRadius="lg" border="1px" borderColor="gray.700">
              <UserForm />
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;