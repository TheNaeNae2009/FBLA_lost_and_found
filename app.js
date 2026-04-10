import express from "express";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// env
const PORT = process.env.PORT || 3000;

// Routers
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";

const app = express();

app.use(express.static("public"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Listening on ports ${PORT}`);
});

export default app;
