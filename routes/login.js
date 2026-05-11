import express from "express"
import bcrypt from "bcrypt"
import db from "../config/db.js"
import { validationResult, body } from "express-validator"

const router = express.Router()


// Startsidan
router.get("/", (req, res, next) => {
    res.render("login.njk")
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

            if (user) {
                var passIsMatch = await bcrypt.compare(password, user.hash_password)
                var petIsMatch = await bcrypt.compare(petname, user.pet_name)
            }

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
                return res.redirect("/create")
            }

        } catch {
            next
        }
})

router.get("/error", (err, req, res, next) => {
    throw(err)
})

// Exporterar inehållet från router
export default router