const pallete = {
  /// May9 새로 추가된 컬러
  white: "#FFFFFF",
  gray1: "#E0E0E0",
  gray2: "#999999",
  gray3: "#555555",
  gray4: "#333333",
  black: "#000000",

  primary100: "#FFF7E0",
  primary200: "#FFDD80",
  primary300: "#FED14C",
  primary400: "#FEC623",
  primary500: "#FEBC00",
  primary600: "#FEAE00",
  primary700: "#FD9B00",
  primary800: "#FD8A00",
  primary850: "#FD7A00",
  primary900: "#FD6A00",
};

const color = {
  /// 기존 컬러
  brandColor: pallete.primary900,
  alertColor: "#FD9B00",
  bgColor: "aliceblue",
  lightGray: "#E7E7E7",
  OpacityGray: "rgba(231,231,231,0.5)",
  gray: "#c4c4c4",
  darkGray: "#686868",
  black: "#2C2C2C",
  white: "#FDFDFD",
  danger: "#FF0005",
  safe: "#00C314",
};

// May8 타이포그래피 여기에서 필요 없으면 삭제 필요

const fontSizes = {};

// May8 하단 view가 필요 없으면 삭제 필요

const view = {
  mobile: `(max-width: 767px)`,
  tablet: `(max-width: 1024px)`,
  desktop: `(min-width: 1025px)`,
  width: "375px",
  maxWidth: "428px",
};

const theme = { pallete, color, fontSizes, view };

export default theme;
