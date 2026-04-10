import express from "express";

import { PORT } from "./config/env.js";

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Listening on ports ${PORT}`);
});

export default app;
