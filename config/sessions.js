import session from "express-session"
import { app } from "../server.js"
import "dotenv/config"

app.use(session({
    secret: process.env.SESSION_SECRET, // Byt ut till en säker nyckel
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: true, // Förhindrar CSRF-attacker
        secure: false, // Sätt till true om du använder HTTPS
        maxAge: 1000 * 60 * 60 * 24 // 24 timmar
    }
}))

