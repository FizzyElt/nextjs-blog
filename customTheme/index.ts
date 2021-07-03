import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import components from './components';
import fontSizes from './fontsSize';
import textStyles from './textStyles';
import colors from './colors';
import styles from './styles';

export const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles,
  colors,
  fontSizes,
  components,
  textStyles,
});

export default theme;
