import "dotenv/config"
import express from "express"
import nunjucks from "nunjucks"
import morgan from "morgan"
import session from "express-session"

import indexRouter from "./routes/index.js"
import aboutMeRouter from "./routes/aboutMe.js"
import blogRouter from "./routes/blog.js"
import loginRouter from "./routes/login.js"
import createRouter from "./routes/create.js"

// Skapar en variabel app som innehåller alla express funktioner
const app = express()
const PORT = process.env.DATABASE_PORT || 3000


// En länk för att hänvisa express till public mappen
app.use(express.static("public"))
app.use(morgan("dev"))

// Vad gör det?
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//  Konfigurerar nunjucks att använda views
// autoscape: true gör att nunjucks automatiskt filtrerar bort farlig html-kod
nunjucks.configure("views", {
    autoescape: true,
    express: app
})

app.use(session({
    secret: "$2b$10$kYqI.6y2DgPcRgHoJEeOXeeu493LrrPtaegEncUip8Hlr5eWl59Gm", // Byt ut till en säker nyckel
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: true, // Förhindrar CSRF-attacker
        secure: false, // Sätt till true om du använder HTTPS
        maxAge: 1000 * 60 * 60 * 24 // 24 timmar
    }
}))


// app.use((req, res, next) => {
//     console.log("This repeats for each callback")
//     next()
// })

// Hämtar url / och skickar Hello till frontend
app.use("/", indexRouter)
app.use("/aboutMe", aboutMeRouter)
app.use("/blog", blogRouter)
app.use("/login", loginRouter)
app.use("/create", createRouter)

// Fångar upp om användaren skrivit in fel url
app.use((req, res, next) => {
    res.status(404).render("404.njk", {
        title: "Page could not be found"
    })
})

// Fångar up om "servern smälter"
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).render("404.njk", {
        title: "A problem has arised"
    })
})

// Exporterar app och PORT så att de kan användas på andra platser
export {app, PORT}