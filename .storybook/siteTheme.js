import { create } from 'storybook/theming';

const darkShade = 'hsl(199deg, 100%, 8%)';
const primary = 'hsl(191deg, 100%, 18%)';
const secondary = 'hsl(332, 70%, 62%)';
const lightShade = 'hsl(200deg, 47%, 66%)';
const softWhite = 'hsl(200, 4%, 85%)';

export default create({
  base: 'dark',
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',
  brandTitle: 'Digital Garden',

  //
  colorPrimary: primary,
  colorSecondary: secondary,

  // UI
  appBg: darkShade,
  appContentBg: darkShade,
  appPreviewBg: darkShade,
  appBorderColor: primary,
  appBorderRadius: 4,

  // Text colors
  textColor: softWhite,
  textInverseColor: darkShade,

  // Toolbar default and active colors
  barTextColor: lightShade,
  barSelectedColor: softWhite,
  barHoverColor: softWhite,
  barBg: primary,

  // Form colors
  inputBg: primary,
  inputBorder: lightShade,
  inputTextColor: softWhite,
  inputBorderRadius: 2,

  textMutedColor: lightShade,

  buttonBg: primary,
  booleanBg: primary,
  booleanSelectedBg: secondary
});
