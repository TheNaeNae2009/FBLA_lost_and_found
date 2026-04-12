import { Router } from "express";

const itemRouter = Router();

itemRouter.post("/upload");

itemRouter.get("/");

itemRouter.get("/:id");

itemRouter.patch("/approve/:id");

itemRouter.patch("/reject/:id");

export default itemRouter;
