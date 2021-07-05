import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {
  Text,
  VStack,
  Avatar,
  Heading,
  HStack,
  Tag,
  TagLabel,
  TagLeftIcon,
} from '@chakra-ui/react';

import { SiReact, SiJavascript, SiTypescript, SiRust } from 'react-icons/si';

import PageContainer from '../container/PageContainer';
import PostItem from '../components/PostItem';
import { GetStaticProps } from 'next';
import { differenceInDays, parse } from 'date-fns';

import custom from '../customFile';

type HomeProps = {
  posts: {
    slug: string;
    frontMatter: {
      title: string;
      date: string;
      excerpt: string;
      tags: string;
    };
  }[];
};

export default function Home({ posts }: HomeProps) {
  const { name, introduction, avatarUrl, mainTags } = custom;
  return (
    <PageContainer>
      <VStack align='center' spacing={6}>
        <VStack>
          {avatarUrl !== '' && <Avatar src={avatarUrl} size='xl' />}
          <Heading>{name}</Heading>
        </VStack>
        <Text textAlign='center'>{introduction}</Text>
        <HStack spacing={4}>
          {mainTags.map(({ name, icon, colorScheme }) => (
            <Tag key={name} size='lg' colorScheme={colorScheme}>
              <TagLeftIcon boxSize='1rem' as={icon} />
              <TagLabel>{name}</TagLabel>
            </Tag>
          ))}
        </HStack>
      </VStack>

      <VStack align='stretch' my={10} spacing={4}>
        {posts.map(({ slug, frontMatter }) => (
          <PostItem key={slug} slug={slug} {...frontMatter} />
        ))}
      </VStack>
    </PageContainer>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const files = fs.readdirSync(path.join('blogs'));

  const posts = files
    .map((filename: string) => {
      const slug = filename.replace('.md', '');

      const markdownWithMeta = fs.readFileSync(
        path.join('blogs', filename),
        'utf-8'
      );

      const { data: frontMatter } = matter(markdownWithMeta);
      return {
        slug,
        frontMatter,
      };
    })
    .sort((a, b) => {
      const aDate = parse(a.frontMatter.date, 'yyyy/MM/dd', new Date());
      const bDate = parse(b.frontMatter.date, 'yyyy/MM/dd', new Date());
      return differenceInDays(bDate, aDate);
    });

  return {
    props: {
      posts,
    },
  };
};
