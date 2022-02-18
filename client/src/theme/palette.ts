import { PaletteOptions } from "@mui/material/styles/createPalette"
import { green, red } from "@mui/material/colors"

export const palette: PaletteOptions | undefined = {
  common: {
    white: "#FFFFFF",
    black: "#000000",
  },
  primary: {
    light: "#69696a",
    main: "#28282a",
    dark: "#1e1e1f",
  },
  secondary: {
    light: "#fff5f8",
    main: "#ff3366",
    dark: "#e62958",
  },
  // warning: {
  //   main: "#ffc071",
  //   dark: "#ffb25e",
  // },
  // error: {
  //   light: red[50],
  //   main: red[500],
  //   dark: red[700],
  // },
  success: {
    light: green[50],
    main: green[500],
    dark: green[700],
  },
  background: {
    paper: "#ececec",
  },
}
