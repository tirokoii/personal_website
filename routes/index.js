import express from "express"
const router = express.Router()

// Startsidan
router.get("/", async (req, res, next) => {
    try {
        const [rows] = await pool.query(`
            SELECT blogPost.id, blogPost.title, blogPost.content, 
            blogPost.created_at, blogPost.tags FROM blogPost
            ORDER BY blogPost.created_at 
            DESC LIMIT 4
        `)
        res.render("index.njk", {
            posts: rows
        })
    } catch (err) {
         res.render("index.njk", {
            error_msg: "No posts yet",
            posts: "none"
         })
    }
})

router.get("/error", (err, req, res, next) => {
    throw(err)
})

// Exporterar inehållet från router
export default router