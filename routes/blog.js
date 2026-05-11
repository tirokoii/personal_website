import express from "express"
const router = express.Router()

// Startsidan
router.get("/", async (req, res, next) => {
    try {
        const [rows] = await pool.query(`
            SELECT blogPost.id, blogPost.title, blogPost.content, 
            blogPost.created_at, blogPost.tags FROM blogPost
            ORDER BY blogPost.created_at
            DESC
        `)
        res.render("blog.njk", {
            posts: rows
        })
    } catch(err) {
        res.render("blog.njk", {
            error_msg: "No posts yet",
            posts: "none"
        })
    }
})

router.get("/error", (req, res, next) => {
    res.render("404.njk", {
        title: "Something went wrong"
    })
})

// Exporterar inehållet från router
export default router