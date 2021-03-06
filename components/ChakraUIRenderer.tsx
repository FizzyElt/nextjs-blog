import * as React from 'react';
import {
  Text,
  Code,
  Divider,
  Link,
  Checkbox,
  ListItem,
  Heading,
  Image,
  OrderedList,
  UnorderedList,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import deepmerge from 'deepmerge';
import { Components } from 'react-markdown/src/ast-to-react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import coy from 'react-syntax-highlighter/dist/cjs/styles/prism/material-dark';

type GetCoreProps = {
  children?: React.ReactNode;
  'data-sourcepos'?: any;
};

function getCoreProps(props: GetCoreProps): any {
  return props['data-sourcepos']
    ? { 'data-sourcepos': props['data-sourcepos'] }
    : {};
}

interface Defaults extends Components {
  heading?: Components['h1'];
}

export const defaults: Defaults = {
  p: function p(props) {
    const { children } = props;
    return <Text mb={2}>{children}</Text>;
  },
  em: function em(props) {
    const { children } = props;
    return <Text as='em'>{children}</Text>;
  },
  blockquote: function blockquote(props) {
    const { children } = props;
    return (
      <Code as='blockquote' p={2}>
        {children}
      </Code>
    );
  },
  code: function code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');
    if (!inline && match) {
      return (
        <SyntaxHighlighter
          language={match[1]}
          style={coy}
          PreTag='div'
          children={String(children).replace(/\n$/, '')}
          {...props}
        />
      );
    }

    return (
      <Code
        className={className}
        whiteSpace='break-spaces'
        d='block'
        w='full'
        p={2}
      >
        {children}
      </Code>
    );
  },
  del: function del(props) {
    const { children } = props;
    return <Text as='del'>{children}</Text>;
  },
  hr: function hr(props) {
    return <Divider my={4} />;
  },
  a: Link,
  img: Image,
  text: function text(props) {
    const { children } = props;
    return <Text as='span'>{children}</Text>;
  },
  ul: function ul(props) {
    const { ordered, children, depth } = props;
    const attrs = getCoreProps(props);
    let Element = UnorderedList;
    let styleType = 'disc';
    if (ordered) {
      Element = OrderedList;
      styleType = 'decimal';
    }
    if (depth === 1) styleType = 'circle';
    return (
      <Element
        spacing={2}
        as={ordered ? 'ol' : 'ul'}
        styleType={styleType}
        pl={4}
        {...attrs}
      >
        {children}
      </Element>
    );
  },
  ol: function ol(props) {
    const { ordered, children, depth } = props;
    const attrs = getCoreProps(props);
    let Element = UnorderedList;
    let styleType = 'disc';
    if (ordered) {
      Element = OrderedList;
      styleType = 'decimal';
    }
    if (depth === 1) styleType = 'circle';
    return (
      <Element
        spacing={2}
        as={ordered ? 'ol' : 'ul'}
        styleType={styleType}
        pl={4}
        {...attrs}
      >
        {children}
      </Element>
    );
  },
  li: function li(props) {
    const { children, checked } = props;
    let checkbox = null;
    if (checked !== null && checked !== undefined) {
      checkbox = (
        <Checkbox isChecked={checked} isReadOnly>
          {children}
        </Checkbox>
      );
    }
    return (
      <ListItem
        {...getCoreProps(props)}
        listStyleType={checked !== null ? 'none' : 'inherit'}
      >
        {checkbox || children}
      </ListItem>
    );
  },
  heading: function heading(props) {
    const { level, children } = props;
    const sizes = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];
    return (
      <Heading
        my={4}
        as={`h${level}`}
        size={sizes[level - 1]}
        {...getCoreProps(props)}
      >
        {children}
      </Heading>
    );
  },
  pre: function pre(props) {
    const { children } = props;
    return <Code {...getCoreProps(props)}>{children}</Code>;
  },
  table: Table,
  thead: Thead,
  tbody: Tbody,
  tr: Tr,
  td: Td,
  th: Th,
};

function ChakraUIRenderer(theme?: Defaults, merge = true): Components {
  const elements = {
    p: defaults.p,
    em: defaults.em,
    blockquote: defaults.blockquote,
    code: defaults.code,
    del: defaults.del,
    hr: defaults.hr,
    a: defaults.a,
    img: defaults.img,
    text: defaults.text,
    ul: defaults.ul,
    ol: defaults.ol,
    li: defaults.li,
    h1: defaults.heading,
    h2: defaults.heading,
    h3: defaults.heading,
    h4: defaults.heading,
    h5: defaults.heading,
    h6: defaults.heading,
    pre: defaults.pre,
    table: defaults.table,
    thead: defaults.thead,
    tbody: defaults.tbody,
    tr: defaults.tr,
    td: defaults.td,
    th: defaults.th,
  };

  if (theme && merge) {
    return deepmerge(elements, theme);
  }

  return elements;
}

export default ChakraUIRenderer;
