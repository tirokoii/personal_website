import express from "express"
import nunjucks from "nunjucks"

// Skapar en variabel app som inehåller alla express funktioner
const app = express()

// En länk för att hänvisa express till public mappen
app.use(express.static("public"))

//  Konfigurerar nunjucks att använda views
// autoscape: true gör att nunjucks automatiskt filtrerar bort farlig html-kod
nunjucks.configure("views", {
    autoescape: true,
    express: app
})

// Hämtar url / och skickar Hello till frontend
app.get("/", (req, res) => {
    res.render("index.njk")
})

// Visar meddelande i terminalen om vilken port som används
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})