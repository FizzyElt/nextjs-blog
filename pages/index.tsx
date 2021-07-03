import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import Image from 'next/image';
import { Text, VStack, Box, useColorMode, Button } from '@chakra-ui/react';
import PageContainer from '../container/PageContainer';
import { GetStaticPaths, GetStaticProps } from 'next';

type HomeProps = {
  posts: {
    slug: string;
    frontMatter: {
      title: string;
      data: string;
      excerpt: string;
    };
  }[];
};

export default function Home({ posts }: HomeProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <PageContainer>
      <Box>
        <Text fontSize='md'>hello</Text>
        <Button onClick={toggleColorMode}>toggle</Button>
      </Box>
    </PageContainer>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const files = fs.readdirSync(path.join('blogs'));

  const posts = files.map((filename: string) => {
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
  });

  console.log(posts);
  return {
    props: {
      posts,
    },
  };
};
