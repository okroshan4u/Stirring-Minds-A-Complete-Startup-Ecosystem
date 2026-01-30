import express from "express"
import Deal from "../models/Deals"
import auth from "../middleware/auth"

const router = express.Router()

// Public deals list
router.get("/", async (req, res) => {
  const deals = await Deal.find()
  res.json(deals)
})

// Single deal
router.get("/:id", async (req, res) => {
  const deal = await Deal.findById(req.params.id)
  res.json(deal)
})

export default router
