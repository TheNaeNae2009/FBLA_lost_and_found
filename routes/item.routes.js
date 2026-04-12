import { Router } from "express";

const itemRouter = Router();

itemRouter.post("/upload");

itemRouter.get("/");

itemRouter.get("/:id");

export default authRouter;
