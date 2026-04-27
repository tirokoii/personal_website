import express from "express"
import nunjucks from "nunjucks"
import morgan from "morgan"

import indexRouter from "./routes/index.js"
import aboutMeRouter from "./routes/aboutMe.js"
import blogRouter from "./routes/blog.js"

// Skapar en variabel app som inehåller alla express funktioner
const app = express()

// En länk för att hänvisa express till public mappen
app.use(express.static("public"))

app.use(morgan("dev"))

//  Konfigurerar nunjucks att använda views
// autoscape: true gör att nunjucks automatiskt filtrerar bort farlig html-kod
nunjucks.configure("views", {
    autoescape: true,
    express: app
})

// app.use((req, res, next) => {
//     console.log("This repeats for each callback")
//     next()
// })

// Hämtar url / och skickar Hello till frontend
app.use("/", indexRouter)
app.use("/aboutMe", aboutMeRouter)
app.use("/blog", blogRouter)

// Fångar upp om användaren skrivit in fel url
app.use((req, res, next) => {
    res.status(404).render("404.njk", {
        title: "Page could not be found"
    })
})

// Fångar up om "servern smälter"
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).render("500.njk", {
        title: "Ett fel uppstod",
        error: process.env.NODE_ENV === "development" ? err.message : ""
    })
})

// Visar meddelande i terminalen om vilken port som används
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

// Exporterar app och PORT så att de kan användas på andra platser
export {app, PORT}