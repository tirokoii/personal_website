import express from "express"
import bcrypt from "bcrypt"
import db from "../config/db.js"
import { validationResult, body } from "express-validator"
import session from "express-session"

const router = express.Router()

router.get("/", async (req, res, next) => {
    // if (!req.session.authenticated) {
    //     return next()
    // }
    res.render("create.njk")
})

router.post("/", 
    body("title")
    .trim()
    .notEmpty()
    .withMessage("Titel is needed"),
    body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is needed"),
    async (req, res, next) => {
       const errors = validationResult(req)
        let messages = []

        if (!errors.isEmpty()) {
            const err = errors.errors
            err.forEach(error => {
                messages.push(error.msg)
            })
        }
        
        const { title, content } = req.body

        try {
            console.log("Nice cock (rooster)")
            post = db.prepare('INSERT INTO post (title, content) VALUES (?, ?)').all(title, content)
        } catch {
            console.log("You dude")
        }
    }
)

router.get("/", (req, res, next) => {
    res.render("404.njk", {
        title: "You are not authorised"
    })
})

export default router