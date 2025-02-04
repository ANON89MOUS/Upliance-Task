import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  Box,
  Button,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Bold, Italic, Underline, List, RefreshCw } from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

const RichTextEditor = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const loadUserData = () => {
      const data = localStorage.getItem('userData');
      if (data) {
        setUserData(JSON.parse(data));
      }
    };

    // Initial load
    loadUserData();

    // Set up storage event listener for real-time updates
    window.addEventListener('storage', loadUserData);

    return () => {
      window.removeEventListener('storage', loadUserData);
    };
  }, []);

  const editor = useEditor({
    extensions: [StarterKit],
    content: userData ? `
      <h2>User Information</h2>
      <p><strong>ID:</strong> ${userData.id}</p>
      <p><strong>Name:</strong> ${userData.name}</p>
      <p><strong>Email:</strong> ${userData.email}</p>
      <p><strong>Phone:</strong> ${userData.phone}</p>
      <p><strong>Address:</strong> ${userData.address}</p>
    ` : '<p>No user data available. Please save user data in the form first.</p>',
    editable: true,
  });

  const refreshData = () => {
    const data = localStorage.getItem('userData');
    if (data) {
      const parsedData = JSON.parse(data);
      setUserData(parsedData);
      editor?.commands.setContent(`
        <h2>User Information</h2>
        <p><strong>ID:</strong> ${parsedData.id}</p>
        <p><strong>Name:</strong> ${parsedData.name}</p>
        <p><strong>Email:</strong> ${parsedData.email}</p>
        <p><strong>Phone:</strong> ${parsedData.phone}</p>
        <p><strong>Address:</strong> ${parsedData.address}</p>
      `);
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <VStack align="stretch" spacing={4}>
      <HStack justify="space-between" align="center">
        <Text fontSize="lg" fontWeight="bold" color="gray.300">
          Rich Text Editor
        </Text>
        <Button
          size="sm"
          leftIcon={<RefreshCw size={16} />}
          onClick={refreshData}
          colorScheme="blue"
          variant="ghost"
        >
          Refresh Data
        </Button>
      </HStack>

      <HStack spacing={2}>
        <Button
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          colorScheme={editor.isActive('bold') ? 'blue' : 'gray'}
          title="Bold"
        >
          <Bold size={16} />
        </Button>
        <Button
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          colorScheme={editor.isActive('italic') ? 'blue' : 'gray'}
          title="Italic"
        >
          <Italic size={16} />
        </Button>
        <Button
          size="sm"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          colorScheme={editor.isActive('strike') ? 'blue' : 'gray'}
          title="Underline"
        >
          <Underline size={16} />
        </Button>
        <Button
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          colorScheme={editor.isActive('bulletList') ? 'blue' : 'gray'}
          title="Bullet List"
        >
          <List size={16} />
        </Button>
      </HStack>

      <Box
        border="1px"
        borderColor="gray.600"
        borderRadius="md"
        p={4}
        minH="200px"
        bg="gray.700"
        color="white"
        sx={{
          '.ProseMirror': {
            outline: 'none',
            minH: '200px',
            'h2': {
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: 'blue.300',
            },
            'p': {
              marginBottom: '0.5rem',
            },
            'strong': {
              color: 'blue.300',
            }
          }
        }}
      >
        <EditorContent editor={editor} />
      </Box>
    </VStack>
  );
};

export default RichTextEditor;