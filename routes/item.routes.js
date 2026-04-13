import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import { getItems, uploadItem, getPendingItems, approveItem, rejectItem, getApprovedItems, claimItem } from "../controllers/item.controller.js";

const itemRouter = Router();

itemRouter.post("/", authorize, upload.array("files"), uploadItem);

itemRouter.get("/", authorize, getItems);

itemRouter.get("/pending", authorize, getPendingItems);

itemRouter.get("/approved", authorize, getApprovedItems);

itemRouter.patch("/approve/:name", authorize, approveItem);

itemRouter.patch("/reject/:name", authorize, rejectItem);

itemRouter.patch("/claim/:name", authorize, claimItem);

export default itemRouter;
