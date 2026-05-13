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
            const insert_post = db.prepare(`INSERT INTO blogPost (title, content) VALUES (?, ?)`)
            insert_post.run(title, content)
            const rows = db.prepare(`
                SELECT blogPost.id, blogPost.title, blogPost.content, 
                blogPost.created_at FROM blogPost
                ORDER BY blogPost.created_at 
                DESC LIMIT 2
            `).all()
            
            if (rows.length !== 0) {
                res.render("create.njk", {
                    msg: "Post successful",
                    post: rows
                })    
            }
        } catch {
            return next()
        }
    }
)

router.get("/", (req, res, next) => {
    res.render("404.njk", {
        title: "You are not authorised"
    })
})

export default router