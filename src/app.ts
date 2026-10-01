import express from "express"

import categoryRoutes from "./routes/category.routes"
import transactionRoutes from "./routes/transaction.routes"

const app = express()

app.use(express.json())

app.use("/categories", categoryRoutes)
app.use("/transactions", transactionRoutes)

export default app;