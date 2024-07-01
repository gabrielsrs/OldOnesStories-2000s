import { Router } from "express";
import { ViewPost } from "../controllers/viewPost.js";
import { CreatePost } from "../controllers/createPost.js";
import { UpdatePost } from "../controllers/updatePost.js";
import { DeletePost } from "../controllers/deletePost.js";

export const router = Router()

const viewPost = new ViewPost()
const createPost = new CreatePost()
const updatePost = new UpdatePost()
const deletePost = new DeletePost()

router.get("/", viewPost.handle)
router.post("/", createPost.handle)
router.post("/update", updatePost.handle)
router.post("/delete", deletePost.handle)