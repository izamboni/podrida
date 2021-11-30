import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const breakpoints = createBreakpoints({
  sm: '320px',
  md: '768px',
  lg: '1024px',
  xl: '1366px',
  '2xl': '1440px',
});

const globalStyle = extendTheme({
  styles: {
    global: {
      'html, body': {
        p: '0',
        m: '0',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
        w: '100%',
        h: '100%',
      },
      '*': {
        boxSizing: 'border-box',
      },
    },
  },
  breakpoints,
  config,
});
export default globalStyle;
