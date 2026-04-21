import express from "express"
const router = express.Router()

// Startsidan
router.get("/", (req, res, next) => {
    res.render("login.njk")
})

// Exporterar inehållet från router
export default router