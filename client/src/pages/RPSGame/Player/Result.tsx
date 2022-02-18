import * as React from "react"
import { useNavigate } from "react-router-dom"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import { IGamePlayer, IPlayerGameResult } from "../../../@types/interfaces"
import { Button } from "../../../components"

interface ResultProps {
  result: IPlayerGameResult & { game: IGamePlayer }
}

export default function Result({ result }: ResultProps) {
  const [open, setOpen] = React.useState<boolean>(false)
  const push = useNavigate()
  const handleClose = () => {
    setOpen(false)
  }
  React.useEffect(() => {
    setTimeout(() => setOpen(true), 2000)
  }, [])

  return (
    <Dialog disableEscapeKeyDown={true} maxWidth='md' open={open} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
      <DialogTitle id='alert-dialog-title'>{"Game result"}</DialogTitle>
      <DialogContent>
        <List sx={{ bgcolor: "background.paper" }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar alt='number' src='https://img.icons8.com/doodle/48/000000/gold-medal.png' />
            </ListItemAvatar>
            <ListItemText primary={"Winner Name: " + result.name} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar alt='number' src='https://img.icons8.com/flat-round/64/000000/arrow--v1.png' />
            </ListItemAvatar>
            <ListItemText
              primary={"First Player|Bot Name / Player|Bot choice"}
              secondary={`${result.game.creator.name} / ${result.game.creator.value}`}
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar alt='number' src='https://img.icons8.com/flat-round/64/000000/arrow--v1.png' />
            </ListItemAvatar>
            <ListItemText
              primary={"Second Bot Name / Bot choice"}
              secondary={`${result.game.secondPlayer?.name} / ${result.game.secondPlayer?.value}`}
            />
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          color='info'
          onClick={() => {
            push("/")
            handleClose()
          }}
        >
          Play again
        </Button>
      </DialogActions>
    </Dialog>
  )
}
