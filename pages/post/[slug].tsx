import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import { Box, Text, Heading, Button } from '@chakra-ui/react';
import ChakraUIRenderer from '../../components/ChakraUIRenderer';
import PageContainer from '../../container/PageContainer';
import { GetStaticPaths, GetStaticProps } from 'next';

type PostPageProps = {
  slug: string;
  frontMatter: {
    title: string;
    date: string;
    excerpt: string;
  };
  content: string;
};

export default function PostPage({
  slug,
  frontMatter,
  content,
}: PostPageProps) {
  return (
    <PageContainer>
      <Box>
        <Text color='gray.500'>{slug}</Text>
        <Heading size='lg'>{frontMatter.date}</Heading>
        <Text>{frontMatter.title}</Text>
        <Button>hello</Button>
        <Box>
          <ReactMarkdown components={ChakraUIRenderer()}>
            {content}
          </ReactMarkdown>
        </Box>
      </Box>
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
