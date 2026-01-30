import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes"
import dealRoutes from "./routes/deal.routes"
import claimRoutes from "./routes/claim.routes"




dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err))

app.get("/", (req, res) => {
  res.send("Startup Benefits API running")
})

app.use("/api/auth", authRoutes)
app.use("/api/deals", dealRoutes)
app.use("/api/claims", claimRoutes)



app.listen(5000, () => {
  console.log("Server running on port 5000")
})
