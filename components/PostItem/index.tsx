import React from 'react';
import { VStack, Heading, Link, HStack, Tag, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

type PostItemProps = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string;
};

export default function PostItem({
  slug,
  title = '',
  excerpt = '',
  date = '',
  tags = '',
}: PostItemProps) {
  const tagList = tags.split(',');
  return (
    <VStack
      align='stretch'
      borderWidth='1px'
      borderColor='gray.500'
      borderRadius='md'
      p={3}
    >
      <HStack justify='space-between'>
        <Link as={NextLink} href={`/post/${slug}`}>
          <Heading cursor='pointer' size='sm'>
            {title}
          </Heading>
        </Link>
        <Text>{date}</Text>
      </HStack>
      <HStack>
        <Text>tags:</Text>
        {tagList.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </HStack>
      <Text color='gray.500' isTruncated>
        {excerpt}
      </Text>
    </VStack>
  );
}
