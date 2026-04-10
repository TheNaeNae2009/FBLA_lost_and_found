import express from "express";

const app = express();

app.use(express.static("public"));

const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Listening on ports ${port}`);
});
