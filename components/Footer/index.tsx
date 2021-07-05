import React from 'react';
import { Flex, Text, Icon, HStack, Link } from '@chakra-ui/react';
import ContentContainer from '../../container/Container';

import { MdEmail } from 'react-icons/md';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import custom from '../../customFile';

export default function Footer() {
  const { links, email } = custom;

  return (
    <ContentContainer py={3}>
      <Flex justify='space-between' direction={{ base: 'column', md: 'row' }}>
        <HStack align='center' py={4}>
          <Icon as={MdEmail} />
          <Text>{email}</Text>
        </HStack>
        <HStack spacing={4}>
          {links.map(({ url, icon }, index) => (
            <Link key={index} href={url}>
              <Icon as={icon} boxSize='1.5rem' />
            </Link>
          ))}
        </HStack>
      </Flex>
    </ContentContainer>
  );
}
