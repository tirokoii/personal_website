import express from "express"
import bcrypt from "bcrypt"
import db from "../config/db.js"
import { validationResult, body } from "express-validator"
import session from "express-session"

const router = express.Router()

// Startsidan
router.get("/", async (req, res, next) => {
    try {
        const rows = db.prepare(`
            SELECT blogPost.id, blogPost.title, blogPost.content, 
            blogPost.created_at FROM blogPost
            ORDER BY blogPost.created_at 
            DESC LIMIT 4
        `).all()
        if (rows.length === 0) {
            res.render("index.njk", {
                error_msg: "No posts yet",
                posts: "none"
            })
        } else {
            res.render("index.njk", {
                posts: rows
            })
        }
    } catch {
        return next()
    }
})

router.get("/", (req, res, next) => {
    res.render("404.njk", {
        title: "Something went wrong"
    })
})


// Exporterar inehållet från router
export default router