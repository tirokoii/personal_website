import { app, PORT } from "./server.js"

// Visar meddelande i terminalen om vilken port som används
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

