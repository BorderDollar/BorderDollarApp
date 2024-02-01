import { extendTheme } from '@chakra-ui/react';
import "@fontsource/nunito";
import "@fontsource/nunito-sans";

const theme = extendTheme({
  fonts: {
    body: 'Nunito, system-ui, sans-serif',
    heading: 'Nunito Sans, Georgia, serif',
    button: 'Nunito, system-ui, sans-serif',
  },
});

export default theme;