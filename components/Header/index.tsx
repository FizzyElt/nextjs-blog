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

import custom from '../../customFile';

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();

  const { name, avatarUrl } = custom;

  return (
    <ContentContainer>
      <Flex px={2} py={4} justify='space-between' align='center' w='full'>
        <Link as={NextLink} href='/'>
          <HStack align='center' spacing={4}>
            {avatarUrl !== '' && <Avatar src={avatarUrl} size={'sm'} />}
            <Heading size='md' letterSpacing='wider' cursor='pointer'>
              {name}
            </Heading>
          </HStack>
        </Link>

        <HStack spacing={4}>
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
