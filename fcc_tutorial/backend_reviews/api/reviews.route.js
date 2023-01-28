import express from "express"

const router = express.Router()

router.route("/").get((req,  res) => res.send("you just spent 5 hours to get this message to send"))

export default router