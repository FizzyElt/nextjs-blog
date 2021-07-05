import React from 'react';
import {
  SiGithub,
  SiTwitter,
  SiJavascript,
  SiTypescript,
  SiRust,
  SiReact,
} from 'react-icons/si';
import { IconType } from 'react-icons';
import { TagLeftIcon } from '@chakra-ui/react';

type Custom = {
  name: string;
  avatarUrl: string;
  email: string;
  introduction: string;

  mainTags: Array<{ name: string; icon: IconType; colorScheme: string }>;

  links: Array<{ url: string; icon: IconType }>;
};

const custom: Custom = {
  name: 'FizzyElt',
  avatarUrl:
    'https://avatars.githubusercontent.com/u/43887006?s=400&u=ebe51a3efd7126ad21461dd8e71ef7dd13185cb1&v=4',
  introduction:
    '嗨，我是不務正業的前端工程師，這裡是我紀錄想法跟思維的地方，這裡不會教你技術，而是教你怎麼思考，希望能激發您的創意及想法。',
  email: 'fizzyelt8786@gmail.com',

  mainTags: [
    {
      name: 'Javascript',
      icon: SiJavascript,
      colorScheme: 'yellow',
    },
    {
      name: 'Typescript',
      icon: SiTypescript,
      colorScheme: 'linkedin',
    },
    {
      name: 'Rust',
      icon: SiRust,
      colorScheme: 'orange',
    },
    {
      name: 'React',
      icon: SiReact,
      colorScheme: 'twitter',
    },
  ],

  links: [
    {
      url: 'https://github.com/FizzyElt',
      icon: SiGithub,
    },
    {
      url: 'https://twitter.com/FizzyElt',
      icon: SiTwitter,
    },
  ],
};

export default custom;
