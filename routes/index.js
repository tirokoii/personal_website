import express from "express"
const router = express.Router()

// Startsidan
router.get("/", (req, res, next) => {
    res.render("index.njk")
})

router.get("/error", (err, req, res, next) => {
    throw(err)
})

// Exporterar inehållet från router
export default router