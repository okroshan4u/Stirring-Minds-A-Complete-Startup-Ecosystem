import express from "express"
import Deal from "../models/Deals"
import auth from "../middleware/auth"

const router = express.Router()


router.get("/", async (req, res) => {
  const deals = await Deal.find()
  res.json(deals)
})


router.get("/:id", async (req, res) => {
  const deal = await Deal.findById(req.params.id)
  res.json(deal)
})

export default router
