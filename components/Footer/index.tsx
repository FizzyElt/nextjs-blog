import React from 'react';
import { Flex, Text, Icon, HStack, Box } from '@chakra-ui/react';
import ContentContainer from '../../container/Container';

import { MdEmail } from 'react-icons/md';
import { FaGithub, FaTwitter } from 'react-icons/fa';
export default function Footer() {
  return (
    <ContentContainer py={3}>
      <Flex justify='space-between' direction={{ base: 'column', md: 'row' }}>
        <HStack align='center' py={4}>
          <Icon as={MdEmail} />
          <Text>fizzyelt8786@gmail.com</Text>
        </HStack>
        <HStack>
          <Icon as={FaGithub} />
          <Icon as={FaTwitter} />
        </HStack>
      </Flex>
    </ContentContainer>
  );
}
