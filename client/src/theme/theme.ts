import { createTheme, Theme } from "@mui/material/styles"
import { palette } from "./palette"
import { typography } from "./typography"
export const theme: Theme = createTheme({
  palette,
  typography,
})
