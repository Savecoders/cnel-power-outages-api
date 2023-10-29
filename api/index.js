// imports and requires
import express from "express";
import routerApi from "./routes/route.routes.js";
import cors from "cors";

// contains
const app = express();
const PORT = 3000 || process.env.PORT;

// middleware
app.use(express.json());

// cors
app.use(cors());

// basic routes
app.get("/api", (req, res) => {
  console.log("Mi api");
  res.send("Hello welcome to my API");
});

// routes for the application
routerApi(app);
// error routes

app.get("*", (req, res) => {
  res.status(404).send("404");
});

// server listen
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
