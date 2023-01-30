import express from "express"

const router = express.Router()

router.route("/").get((req,  res) => res.send("you just spent 7 hours to get this message to send"))

export default router