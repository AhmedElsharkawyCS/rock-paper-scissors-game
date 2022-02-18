import * as React from "react"
import Typography, { TypographyProps } from "@mui/material/Typography"

interface IProps extends TypographyProps {}
export default function Text({ children, sx = [], ...rest }: IProps) {
  return (
    <Typography variant='h5' gutterBottom {...rest} sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}>
      {children}
    </Typography>
  )
}
