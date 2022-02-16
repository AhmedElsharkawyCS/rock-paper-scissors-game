import express from "express"
import http from "http"
import { Server } from "socket.io"
import IOGameEvents from "./events/IOGameEvents"
import RPSGame from "./libs/RPSGame"

const expressApp = express()
const server = http.createServer(expressApp)
const io = new Server(server)
const rpsGame = new RPSGame()
new IOGameEvents(io, rpsGame)

export { server }
