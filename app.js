import express from "express";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// env
const PORT = process.env.PORT || 3000;

// Routers
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import itemRouter from "./routes/item.routes.js";

// DB
import connectToDatabase from "./database/mongodb.js";

// Middleware
import errorMiddleware from "./middlewares/error.middleware.js";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(arcjetMiddleware);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/items", itemRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, async () => {
  console.log(`Listening on ports ${PORT}`);

  await connectToDatabase();
});

export default app;
