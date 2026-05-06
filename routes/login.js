import express from "express"
import bcrypt from "bcrypt"
import db from "../config/db.js"
import { param, validationResult, body } from "express-validator"
const router = express.Router()

// Startsidan
router.get("/", (req, res, next) => {
    res.render("login.njk")
})

router.post("/",
    body("username")
    .trim()
    .notEmpty()
    .withMessage("Nothing is not the answer")
    .isLength({ min: 1 })
    .withMessage("Make it longer dear"),
    body("password")
    .trim()
    .notEmpty()
    .withMessage("Nothing, really?")
    .isLength({ min: 1 })
    .withMessage("You dare make it longer"),
    body("petname")
    .trim()
    .notEmpty()
    .withMessage("Nice try"),
    async (req, res, next) => {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            // messages = []
            // errors.forEach(error => messages.push(error.msg))
            // console.log(messages)
            // res.render("login.njk", {
            //     messages: messages
            // })
        }
})

router.get("/error", (err, req, res, next) => {
    throw(err)
})

// Exporterar inehållet från router
export default router