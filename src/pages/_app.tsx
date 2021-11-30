import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
// import { setContext } from '@apollo/client/link/context';
import { ChakraProvider } from '@chakra-ui/react';
import globalStyle from 'utils/globalStyles';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider theme={globalStyle}>
    <Component {...pageProps} />
  </ChakraProvider>
);

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});
