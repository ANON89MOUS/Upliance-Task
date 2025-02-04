import React, { useState } from 'react';
import { Box, Button, Text, HStack, VStack } from '@chakra-ui/react';
import { useSpring, animated } from 'react-spring';

const Counter = () => {
  const [count, setCount] = useState(0);
  
  const animatedStyle = useSpring({
    background: `linear-gradient(180deg, 
      rgba(66, 153, 225, ${Math.min(count * 0.1, 0.9)}) 0%, 
      rgba(255, 255, 255, 0) 100%)`,
    config: { tension: 120, friction: 14 }
  });

  const AnimatedBox = animated(Box);

  const handleIncrement = () => setCount(prev => prev + 1);
  const handleDecrement = () => setCount(prev => Math.max(0, prev - 1));
  const handleReset = () => setCount(0);

  return (
    <AnimatedBox
      style={animatedStyle}
      borderRadius="md"
      p={4}
      minH="200px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack spacing={4}>
        <Text fontSize="4xl" fontWeight="bold" color="white">
          {count}
        </Text>
        <HStack spacing={4}>
          <Button
            size="sm"
            colorScheme="blue"
            onClick={handleDecrement}
            isDisabled={count === 0}
          >
            -
          </Button>
          <Button size="sm" colorScheme="red" onClick={handleReset}>
            Reset
          </Button>
          <Button size="sm" colorScheme="blue" onClick={handleIncrement}>
            +
          </Button>
        </HStack>
      </VStack>
    </AnimatedBox>
  );
}

export default Counter;