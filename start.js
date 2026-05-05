import { app, PORT } from "./server.js"

// Visar meddelande i terminalen om vilken port som används
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})