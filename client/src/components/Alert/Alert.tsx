import * as React from "react"
import Alert, { AlertProps } from "@mui/material/Alert"

interface IProps extends AlertProps {}
export default function MUIAlert({ severity, children, variant, ...props }: IProps) {
  return (
    <Alert id='alert' aria-label='alert' variant={variant || "outlined"} severity={severity || "error"} {...props}>
      {children || "An error has occurred"}
    </Alert>
  )
}
