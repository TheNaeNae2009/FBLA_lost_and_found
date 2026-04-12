import { Router } from "express";

const claimRouter = Router();

claimRouter.get("/");

claimRouter.get("/:id");

export default claimRouter;
