import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

type ContentContainerProps = {
  children?: React.ReactNode;
} & BoxProps;

export default function ContentContainer({
  children,
  ...props
}: ContentContainerProps) {
  return (
    <Box
      maxW={{ base: '100%', md: '48rem' }}
      w='full'
      margin='auto'
      px={4}
      {...props}
    >
      {children}
    </Box>
  );
}
