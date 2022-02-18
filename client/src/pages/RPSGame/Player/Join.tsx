import React, { useState } from "react"
import Stack from "@mui/material/Stack"
import { TextField, Button } from "../../../components"

interface StartProps {
  onJoin: (playerName: string, roomId: string) => void
}
export default function Join({ onJoin }: StartProps) {
  const [name, setName] = useState<string>("")
  const [roomId, setRoomId] = useState<string>("")
  const [error, setError] = useState<{ name: string; roomId: string }>({ name: "", roomId: "" })
  const handleOnJoin = () => {
    if (!name || name.length < 3) setError({ ...error, name: "computer name must be at least 3 characters" })
    if (roomId.length !== 10) return setError({ ...error, roomId: "invalid room ID" })
    onJoin(name, roomId)
  }

  return (
    <Stack spacing={2}>
      <Stack spacing={2}>
        <TextField
          onChange={({ target }) => {
            setName(target.value)
            error.name && setError({ ...error, name: "" })
          }}
          id='standard-basic-name'
          label='Player name'
          variant='standard'
          helperText={error.name}
          error={!!error.name}
        />
        <TextField
          onChange={({ target }) => {
            setRoomId(target.value)
            error.roomId && setError({ ...error, roomId: "" })
          }}
          id='standard-basic-room'
          label='Room Id'
          variant='standard'
          helperText={error.roomId}
          error={!!error.roomId}
        />
      </Stack>
      <Button onClick={handleOnJoin} disabled={!name || !roomId}>
        Join Game
      </Button>
    </Stack>
  )
}
