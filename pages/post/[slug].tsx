import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import {
  Box,
  Text,
  Heading,
  Button,
  VStack,
  HStack,
  Tag,
} from '@chakra-ui/react';
import ChakraUIRenderer from '../../components/ChakraUIRenderer';
import PageContainer from '../../container/PageContainer';
import gfm from 'remark-gfm';
import { GetStaticPaths, GetStaticProps } from 'next';

type PostPageProps = {
  slug: string;
  frontMatter: {
    title: string;
    date: string;
    excerpt: string;
    tags: string;
  };
  content: string;
};

export default function PostPage({
  slug,
  frontMatter,
  content,
}: PostPageProps) {
  const tagList = frontMatter.tags.split(',');
  return (
    <PageContainer>
      <VStack align='stretch' spacing={10}>
        {/** post info block */}
        <VStack align='flex-start'>
          <Heading>{frontMatter.title}</Heading>
          <Text>{frontMatter.date}</Text>
          <HStack>
            {tagList.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </HStack>
        </VStack>

        {/** markdown block */}
        <ReactMarkdown remarkPlugins={[gfm]} components={ChakraUIRenderer()}>
          {content}
        </ReactMarkdown>
      </VStack>
    </PageContainer>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join('blogs'));

  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace('.md', ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = (params?.slug as string) || '';
  const markdownWithMeta = fs.readFileSync(
    path.join('blogs', `${slug}.md`),
    'utf-8'
  );

  const { data: frontMatter, content } = matter(markdownWithMeta);
  return {
    props: {
      slug,
      frontMatter,
      content,
    },
  };
};
