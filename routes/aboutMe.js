import express from "express"
const router = express.Router()

// Startsidan
router.get("/", (req, res, next) => {
    res.render("aboutMe.njk")
})

router.get("/", (req, res, next) => {
    res.render("404.njk", {
        title: "Something went wrong"
    })
})


// Exporterar inehållet från router
export default router