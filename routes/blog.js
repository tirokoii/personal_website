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
            DESC
        `).all()

        const post_tag = db.prepare(`
            SELECT * FROM postTag
        `).all()

        const tag_row = db.prepare(`
            SELECT * FROM tag
        `).all()

        // const tag_rows = db.prepare(`
        //     SELECT tag_id FROM postTag
        //     WHERE post_id = (?)
        // `)

        // tag_rows.all(rows[0].id)

        if (rows.length !== 0) {
            res.render("blog.njk", {
                posts: rows,
                tag_post_row: post_tag,
                tags: tag_row
            })
        } else {
            res.render("blog.njk", {
                error_msg: "No posts yet",
            })
        }
    } catch(err) {
        console.log(err)
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