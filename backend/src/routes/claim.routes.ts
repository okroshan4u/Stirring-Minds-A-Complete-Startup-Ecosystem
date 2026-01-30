import express from "express"
import Claim from "../models/Claim"
import Deal, { IDeal } from "../models/Deals"
import auth from "../middleware/auth"

const router = express.Router()

router.post("/:dealId", auth, async (req: any, res) => {
  try {
    const deal = await Deal.findById(req.params.dealId)

    if (!deal) {
      return res.status(404).json({ message: "Deal not found" })
    }

    const user = req.user

   
    if (deal.isLocked && !user.isVerified) {
      return res.status(403).json({
        message: "Verification required to claim this deal"
      })
    }

  
    if (deal.requiresVerified && !user.isVerified) {
      return res.status(403).json({
        message: "Verification required"
      })
    }

  
    if (deal.requiresPremium && !user.isPremium) {
      return res.status(403).json({
        message: "Premium required"
      })
    }

    const existing = await Claim.findOne({
      user: user._id,
      deal: deal._id
    })

    if (existing) {
      return res.status(400).json({ message: "Already claimed" })
    }

    const claim = await Claim.create({
      user: user._id,
      deal: deal._id,
      status: "pending",
      statusMessage: "Partner approval pending"
    })

    res.json(claim)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
})



router.get("/my", auth, async (req: any, res) => {
  const claims = await Claim.find({ user: req.user._id })
    .populate("deal")

  res.json(claims)
})

export default router
