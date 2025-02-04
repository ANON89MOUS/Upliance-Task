import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Text,
} from '@chakra-ui/react';

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

const initialData: UserData = {
  id: uuidv4(), // Generate ID immediately
  name: '',
  email: '',
  phone: '',
  address: '',
};

const UserForm = () => {
  const [formData, setFormData] = useState<UserData>(initialData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const toast = useToast();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
      setHasUnsavedChanges(false);
    }
  }, []);

  // Handle unsaved changes warning
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };

    const handleTabClose = () => {
      if (hasUnsavedChanges) {
        setIsDialogOpen(true);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleTabClose);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleTabClose);
    };
  }, [hasUnsavedChanges]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setHasUnsavedChanges(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to localStorage
    localStorage.setItem('userData', JSON.stringify(formData));
    setHasUnsavedChanges(false);
    
    toast({
      title: 'Success',
      description: 'User data saved successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    // Generate new ID for next entry
    setFormData(prev => ({ ...prev, id: uuidv4() }));
  };

  const handleReset = () => {
    setFormData(initialData);
    setHasUnsavedChanges(true);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <Box>
            <FormControl mb={4}>
              <FormLabel color="gray.300">ID (Auto-generated)</FormLabel>
              <Input
                value={formData.id}
                isReadOnly
                bg="gray.700"
                border="none"
                color="blue.300"
                fontFamily="mono"
              />
            </FormControl>
            <FormControl isRequired mb={4}>
              <FormLabel color="gray.300">Name</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                bg="gray.700"
                border="none"
                color="white"
                _placeholder={{ color: 'gray.400' }}
              />
            </FormControl>
            <FormControl isRequired mb={4}>
              <FormLabel color="gray.300">Email</FormLabel>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                bg="gray.700"
                border="none"
                color="white"
                _placeholder={{ color: 'gray.400' }}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl isRequired mb={4}>
              <FormLabel color="gray.300">Phone</FormLabel>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                bg="gray.700"
                border="none"
                color="white"
                _placeholder={{ color: 'gray.400' }}
              />
            </FormControl>
            <FormControl isRequired mb={4}>
              <FormLabel color="gray.300">Address</FormLabel>
              <Input
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                bg="gray.700"
                border="none"
                color="white"
                _placeholder={{ color: 'gray.400' }}
              />
            </FormControl>
            <Box display="flex" gap={4} mt={6}>
              <Button
                type="submit"
                colorScheme="blue"
                flex="1"
                isDisabled={!hasUnsavedChanges}
              >
                Save
              </Button>
              <Button
                type="button"
                colorScheme="red"
                variant="outline"
                onClick={handleReset}
              >
                Reset
              </Button>
            </Box>
            {hasUnsavedChanges && (
              <Text color="yellow.300" fontSize="sm" mt={2}>
                You have unsaved changes
              </Text>
            )}
          </Box>
        </SimpleGrid>
      </form>

      <AlertDialog
        isOpen={isDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsDialogOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg="gray.800" color="white">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Unsaved Changes
            </AlertDialogHeader>
            <AlertDialogBody>
              You have unsaved changes. Are you sure you want to leave? Your changes will be lost.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsDialogOpen(false)}>
                Stay
              </Button>
              <Button colorScheme="red" onClick={() => window.close()} ml={3}>
                Leave
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default UserForm;