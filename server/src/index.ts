import { server } from "./app"

const PORT = process.env.PORT || 8000
const main = async () => {
  server.listen(PORT, () => {
    console.log(`game server app is running on http://localhost:${PORT}`)
  })
}

main()
