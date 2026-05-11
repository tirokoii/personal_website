import express from "express"
const router = express.Router()

router.get("/", async (req, res, next) => {
    if (!req.session.authenticated) {
        return next()
    }
    res.render("login.njk")
})

router.get("/error", (err, req, res, next) => {
    res.render("404.njk", {
        title: "You are not authorised"
    })
})

export default router