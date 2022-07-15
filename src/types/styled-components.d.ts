//styled-components.d.ts  it's to TS recognize my theme
import { themeApp } from 'styles/theme';

// inferência de tipos
type Theme = typeof themeApp;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
