import express from "express";

import categoryRoutes from "./routes/category.routes";
import transactionRoutes from "./routes/transaction.routes";
import marketRoutes from "./routes/market.routes";
import { requireJsonAccept } from "./middleware/requireJsonAccept";

const app = express();

app.use(express.json());
app.use("/", requireJsonAccept);

app.use("/categories", categoryRoutes);
app.use("/transactions", transactionRoutes);
app.use("/market", marketRoutes);

export default app;
