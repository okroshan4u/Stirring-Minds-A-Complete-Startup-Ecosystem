import mongoose from "mongoose"

const claimSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  deal: { type: mongoose.Schema.Types.ObjectId, ref: "Deal", required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  statusMessage: String,
  expiresAt: Date
}, { timestamps: true })

export default mongoose.model("Claim", claimSchema)
