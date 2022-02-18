import React, { useState } from "react"
import Stack from "@mui/material/Stack"
import { TextField, Button } from "../../../components"

interface StartProps {
  onStart: (playerName: string) => void
}
export default function Start({ onStart }: StartProps) {
  const [name, setName] = useState<string>("")
  const [error, setError] = useState<null | string>()
  const handleOnStart = () => {
    if (!name || name.length < 3) return setError("player/computer name must be at least 3 characters")
    onStart(name)
  }
  return (
    <Stack spacing={2}>
      <TextField
        onChange={({ target }) => {
          setName(target.value)
          error && setError(null)
        }}
        id='standard-basic'
        label='Player name'
        variant='standard'
        helperText={error}
        error={!!error}
      />
      <Button onClick={handleOnStart} disabled={!name}>
        Start Game
      </Button>
    </Stack>
  )
}
