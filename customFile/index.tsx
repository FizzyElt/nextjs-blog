import React from 'react';
import { SiGithub, SiJavascript } from 'react-icons/si';
import { IconType } from 'react-icons';

type Custom = {
  name: string;
  avatarUrl: string;
  email: string;
  introduction: string;

  mainTags: Array<{ name: string; icon?: IconType; colorScheme?: string }>;

  links: Array<{ url: string; icon: IconType }>;
};

const custom: Custom = {
  name: '', // 名字
  avatarUrl: '', // 頭像連結
  introduction: '', // 自我介紹
  email: '', // email

  mainTags: [
    // 主要標籤 需要到react-icon找到指定icon import 進來 或者為空
    // colorSchema 到這裡的 colorscheme 找 https://chakra-ui.com/docs/data-display/tag#props
    {
      name: 'Javascript',
      icon: SiJavascript,
      colorScheme: 'yellow',
    },
  ],

  // 相關連結 需要到react-icon找到指定icon import 進來
  links: [
    {
      url: '',
      icon: SiGithub,
    },
  ],
};

export default custom;
