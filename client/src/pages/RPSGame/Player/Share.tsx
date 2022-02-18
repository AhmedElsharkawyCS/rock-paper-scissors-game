import React from "react"
import Stack from "@mui/material/Stack"
import Chip from "@mui/material/Chip"
import { Text } from "../../../components"
interface ShareProps {
  roomId: string
  isWaiting: boolean
}
export default function Share({ isWaiting, roomId }: ShareProps) {
  return (
    <Stack spacing={3}>
      <Stack direction='row' spacing={1}>
        <Text variant='h5'>Share this code:</Text>
        <Chip label={roomId} />
        <Text variant='h5'>with the second player to join you</Text>
      </Stack>
      {isWaiting && (
        <Text variant='h6' sx={{ fontWeight: 400 }}>
          Waiting till joining the second player...
        </Text>
      )}
    </Stack>
  )
}
