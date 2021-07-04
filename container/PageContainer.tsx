import React from 'react';
import { VStack, Flex, Box } from '@chakra-ui/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContentContainer from './Container';

type PageContainerProps = {
  children?: React.ReactNode;
  hideHeader?: boolean;
  hideFooter?: boolean;
};

export default function PageContainer({
  children,
  hideFooter = false,
  hideHeader = false,
}: PageContainerProps) {
  return (
    <Flex
      direction='column'
      minH='100vh'
      align='stretch'
      justifyContent='space-between'
    >
      {hideHeader ? null : <Header />}
      <Box flex='1' my={10}>
        <ContentContainer>{children}</ContentContainer>
      </Box>
      {hideFooter ? null : <Footer />}
    </Flex>
  );
}
