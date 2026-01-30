import mongoose, { Document, Model } from "mongoose"

export interface IDeal extends Document {
  title: string
  description: string
  category: "cloud" | "marketing" | "devtools" | "finance" | "productivity"

  isLocked: boolean
  requiresVerified: boolean
  requiresPremium: boolean

  value?: string
  savings?: string

  claimedCount: number
  validUntil?: Date

  features: string[]

  eligibility?: {
    minFunding?: number
    maxAge?: number
    requirements?: string[]
  }

  partner: {
    name: string
    logo: string
    description?: string
    website?: string
  }

  termsUrl?: string
}

const DealSchema = new mongoose.Schema<IDeal>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },

    category: {
      type: String,
      enum: ["cloud", "marketing", "devtools", "finance", "productivity"],
      required: true
    },

    value: String,
    savings: String,

    isLocked: { type: Boolean, default: false },
    requiresVerified: { type: Boolean, default: false },
    requiresPremium: { type: Boolean, default: false },

    claimedCount: { type: Number, default: 0 },
    validUntil: Date,

    features: { type: [String], default: [] },

    eligibility: {
      minFunding: Number,
      maxAge: Number,
      requirements: [String]
    },

    partner: {
      name: String,
      logo: String,
      description: String,
      website: String
    },

    termsUrl: String
  },
  { timestamps: true }
)

const Deal: Model<IDeal> = mongoose.model<IDeal>("Deal", DealSchema)

export default Deal
