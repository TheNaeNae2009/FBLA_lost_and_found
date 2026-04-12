import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import { uploadItem } from "../controllers/item.controller.js";

const itemRouter = Router();

itemRouter.post("/", authorize, upload.array("images", 5), uploadItem);

// itemRouter.get("/");

// itemRouter.get("/:name");

// itemRouter.patch("/approve/:name");

// itemRouter.patch("/reject/:name");

export default itemRouter;
