import React from "react"
import { io, Socket } from "socket.io-client"
import { GameEvents } from "../@types/enums"

interface UseSocketIOProps {
  url?: string
}
function useSocketIO(props?: UseSocketIOProps) {
  const { url } = props || {}
  const [socket, setSocket] = React.useState<Socket>()
  const [isOffline, setIsOffline] = React.useState<boolean>(false)

  const socketHandling = React.useCallback(() => {
    const socketIo = io(url || "http://localhost:8000")
    socketIo.on(GameEvents.GAME_ERROR, ({ message }) => alert(message))
    socketIo.on("error", (error) => {
      alert(error)
    })
    socketIo.on("connect", () => {
      setIsOffline(false)
      console.log("socket successfully established")
    })
    socketIo.on("disconnect", () => {
      console.log("socket successfully disconnected")
    })
    socketIo.on("connect_error", () => {
      console.log("Socket connection failed")
      setIsOffline(true)
      setTimeout(() => socketIo.connect(), 5000)
    })
    setSocket(socketIo)
    return socketIo
  }, [url])

  React.useEffect(() => {
    const socketClient = socketHandling()
    return () => {
      socketClient?.disconnect?.()
    }
  }, [socketHandling])

  return { socket: socket as Socket, isOffline }
}

export default useSocketIO
