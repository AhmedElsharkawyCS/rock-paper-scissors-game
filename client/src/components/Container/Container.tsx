import * as React from "react"
import Container, { ContainerProps } from "@mui/material/Container"

interface IProps extends ContainerProps {}
export default function MUIContainer({ children, sx = [], ...rest }: IProps) {
  return (
    <Container
      maxWidth='lg'
      {...rest}
      sx={[
        {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "common.white",
          borderRadius: "4px",
          color: "primary.main",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Container>
  )
}
