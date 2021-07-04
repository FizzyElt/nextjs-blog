import React from 'react';
import {
  Flex,
  Heading,
  IconButton,
  HStack,
  Avatar,
  Link,
  Icon,
  useColorMode,
} from '@chakra-ui/react';

import NextLink from 'next/link';

import ContentContainer from '../../container/Container';

import { FaSun, FaMoon, FaGithub } from 'react-icons/fa';

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <ContentContainer>
      <Flex px={2} py={4} justify='space-between' align='center' w='full'>
        <Link as={NextLink} href='/'>
          <HStack align='center' spacing={4}>
            <Avatar
              src='https://avatars.githubusercontent.com/u/43887006?s=400&u=ebe51a3efd7126ad21461dd8e71ef7dd13185cb1&v=4'
              size={'sm'}
            />
            <Heading size='md' letterSpacing='wider' cursor='pointer'>
              FizzyElt
            </Heading>
          </HStack>
        </Link>

        <HStack spacing={4}>
          <Icon
            as={FaGithub}
            boxSize={{ base: '1.5rem', md: '2rem' }}
            cursor='pointer'
          />
          <IconButton
            onClick={toggleColorMode}
            aria-label='toggle mode'
            borderRadius='md'
            icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
          />
        </HStack>
      </Flex>
    </ContentContainer>
  );
}
