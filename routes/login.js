import express from "express"
import bcrypt from "bcrypt"
import db from "../config/db.js"
import { validationResult, body } from "express-validator"
import session from "express-session"

const router = express.Router()

// Startsidan
router.get("/", (req, res, next) => {
    let messages = []
    if (req.session.username) {
        messages.push("You're logged in")
    } else if (!req.session.username) {
        messages.push("You're not logged in")
    }
    res.render("login.njk", {
        messages: messages
    })
})

router.post("/",
    body("username")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Nothing is not the answer"),
    body("password")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Nothing, really?"),
    body("petname")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Nice try"),
    async (req, res, next) => {
        const errors = validationResult(req)
        let messages = []

        if (!errors.isEmpty()) {
            const err = errors.errors
            err.forEach(error => {
                messages.push(error.msg)
            })
        }

        const { username, password, petname } = req.body

        try {
            const rows = db.prepare('SELECT * FROM user WHERE name = (?)').all(username)
            const user = rows[0]

            if (!user) {
                messages.push("Username or password doesn't match")
                return res.render("login.njk", {
                    messages: [messages]
                })
            }

            const passIsMatch = await bcrypt.compare(password, user.hash_password)
            const petIsMatch = await bcrypt.compare(petname, user.pet_name)

            if (!passIsMatch || !petIsMatch) {
                if (!petIsMatch) {
                    messages.push("Dude come on you do not know me that well...")
                }
                if (!passIsMatch) {
                    messages.push("Username or password doesn't match")
                }

                res.render("login.njk", {
                    messages: [messages]
                })
            } else {
                req.session.username = user.name
                req.session.authenticated = true

                return res.redirect("/create")
            }

        } catch {
            return next()
        }
})

router.post("/logout",
    async (req, res, next) => {
        const errors = validationResult(req)
        let messages = []

        if (!errors.isEmpty()) {
            const err = errors.errors
            err.forEach(error => {
                messages.push(error.msg)
            })
        }

        const { out } = req.body
        console.log(out)

        try {
            console.log(req.sessionID)
            if (out) {
                req.session.username = ""
                req.sessionID = ""
                req.session.authenticated = false
                return res.redirect("/login")
            }
        } catch(err) {
            console.log(err)
        }
})

router.get("/", (req, res, next) => {
    res.render("404.njk", {
        title: "Something went wrong"
    })
})

// Exporterar inehållet från router
export default router