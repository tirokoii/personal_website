import express from "express"
const router = express.Router()

// Startsidan
router.get("/", (req, res) => {
    res.render("login.njk")
})

// Exporterar inehållet från router
export default router