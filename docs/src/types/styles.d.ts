import 'styled-components';

import theme from '../lib/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: { [key in keyof typeof theme.color]: string };
    easing: { [key in keyof typeof theme.easing]: string };
    font: { [key in keyof typeof theme.font]: string };
    radius: { [key in keyof typeof theme.font]: string };
  }
}
