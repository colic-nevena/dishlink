const tintColorLight = '#FF7043';
const tintColorDark = '#8BC34A';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#FFF3E0',
    tint: tintColorLight,
    icon: '#8BC34A',
    tabIconDefault: '#8BC34A',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#FF7043',
    tabIconDefault: '#FF7043',
    tabIconSelected: tintColorDark,
  },
};

interface CustomColors {
  primary: string;
  secondary: string;
  black: string;
  white: string;
  mediumGrey: string;
  lightGrey: string;
  darkGrey: string;
  danger: string;
}

const colors: CustomColors = {
  primary: "#FF7043",
  secondary: "#8BC34A",
  black: "#000",
  white: "#FFF3E0",
  mediumGrey: "#6e6969",
  lightGrey: "#f8f4f4",
  darkGrey: "#0c0c0c",
  danger: "#ff5252",
};

export default colors;
