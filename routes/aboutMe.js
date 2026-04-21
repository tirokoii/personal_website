import express from "express"
const router = express.Router()

// Startsidan
router.get("/", (req, res, next) => {
    res.render("aboutMe.njk")
})

// Exporterar inehållet från router
export default router