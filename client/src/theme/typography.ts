import { TypographyOptions } from "@mui/material/styles/createTypography"
import { pxToRem } from "../utils/font"

// const breakpoints = createBreakpoints({});
export const typography: TypographyOptions | undefined = {
  fontFamily: "'Roboto', sans-serif",
  fontSize: 14,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 700,
  h1: {
    letterSpacing: 0,
    fontSize: pxToRem(60),
    "@media (max-width:600px)": {
      fontSize: pxToRem(50),
    },
    "@media (max-width:400px)": {
      fontSize: pxToRem(40),
    },
  },
  h2: {
    fontSize: pxToRem(48),
    "@media (max-width:600px)": {
      fontSize: pxToRem(40),
    },
    "@media (max-width:400px)": {
      fontSize: pxToRem(35),
    },
  },
  h3: {
    fontSize: pxToRem(42),
    "@media (max-width:600px)": {
      fontSize: pxToRem(35),
    },
    "@media (max-width:400px)": {
      fontSize: pxToRem(30),
    },
  },
  h4: {
    fontSize: pxToRem(36),
    "@media (max-width:600px)": {
      fontSize: pxToRem(30),
    },
    "@media (max-width:400px)": {
      fontSize: pxToRem(25),
    },
  },
  h5: {
    fontSize: pxToRem(20),
    "@media (max-width:600px)": {
      fontSize: pxToRem(16),
    },
    "@media (max-width:400px)": {
      fontSize: pxToRem(15),
    },
  },
  h6: {
    fontSize: pxToRem(18),
    "@media (max-width:600px)": {
      fontSize: pxToRem(15),
    },
    "@media (max-width:400px)": {
      fontSize: pxToRem(14),
    },
  },
  subtitle1: {
    fontSize: pxToRem(18),
    "@media (max-width:600px)": {
      fontSize: pxToRem(15),
    },
    "@media (max-width:400px)": {
      fontSize: pxToRem(14),
    },
  },
  body1: {
    fontSize: pxToRem(16),
    "@media (max-width:600px)": {
      fontSize: pxToRem(13),
    },
    "@media (max-width:400px)": {
      fontSize: pxToRem(12),
    },
  },
  body2: {
    fontSize: pxToRem(14),
    "@media (max-width:600px)": {
      fontSize: pxToRem(12),
    },
    "@media (max-width:400px)": {
      fontSize: pxToRem(10),
    },
  },
}
