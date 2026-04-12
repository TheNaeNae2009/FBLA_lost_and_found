import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import { getItems, uploadItem } from "../controllers/item.controller.js";

const itemRouter = Router();

itemRouter.post("/", upload.any(), authorize, uploadItem);

itemRouter.get("/", authorize, getItems);

// itemRouter.get("/:name");

// itemRouter.patch("/approve/:name");

// itemRouter.patch("/reject/:name");

export default itemRouter;
