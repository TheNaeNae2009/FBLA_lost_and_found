import { Router } from "express";

const inquiryRouter = Router();

inquiryRouter.get("/");

inquiryRouter.get("/:id");

export default inquiryRouter;
