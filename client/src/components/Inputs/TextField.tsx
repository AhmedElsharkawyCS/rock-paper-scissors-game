import React from "react"
import TextField, { TextFieldProps } from "@mui/material/TextField"

export default function MUITextField({ sx = [], ...props }: TextFieldProps) {
  return (
    <TextField
      label='text field'
      aria-label='text-field'
      id='textField'
      variant='standard'
      fullWidth
      inputProps={{ "aria-labelledby": "input", role: "input" }}
      {...props}
      sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}
    />
  )
}
