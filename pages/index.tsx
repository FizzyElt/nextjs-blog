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
  return (
    <PageContainer>
      <VStack align='center' spacing={6}>
        <VStack>
          <Avatar
            src='https://avatars.githubusercontent.com/u/43887006?s=400&u=ebe51a3efd7126ad21461dd8e71ef7dd13185cb1&v=4'
            size='xl'
          />
          <Heading>FizzyElt</Heading>
        </VStack>
        <Text textAlign='center'>
          嗨，我是不務正業的前端工程師，這裡是我紀錄想法跟思維的地方，這裡不會教你技術，而是教你怎麼思考，希望能激發您的創意及想法。
        </Text>
        <HStack spacing={4}>
          <Tag size='lg' colorScheme='yellow'>
            <TagLeftIcon boxSize='1rem' as={SiJavascript} />
            <TagLabel>Javascript</TagLabel>
          </Tag>
          <Tag size='lg' colorScheme='linkedin'>
            <TagLeftIcon boxSize='1rem' as={SiTypescript} />
            <TagLabel>Typescript</TagLabel>
          </Tag>
          <Tag size='lg' colorScheme='orange'>
            <TagLeftIcon boxSize='1rem' as={SiRust} />
            <TagLabel>Rust</TagLabel>
          </Tag>
          <Tag size='lg' colorScheme='twitter'>
            <TagLeftIcon boxSize='1rem' as={SiReact} />
            <TagLabel>React</TagLabel>
          </Tag>
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
