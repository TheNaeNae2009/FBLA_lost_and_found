import { Router } from "express";

const itemRouter = Router();

itemRouter.post("/upload");

itemRouter.get("/");

itemRouter.get("/:name");

itemRouter.patch("/approve/:name");

itemRouter.patch("/reject/:name");

export default itemRouter;
