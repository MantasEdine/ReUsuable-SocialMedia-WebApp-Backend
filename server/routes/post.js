import express from "express";
import mongoose from "mongoose";
const router = express.Router();
import {
  createPost,
  getFeedPosts,
  getUserPosts,
  likePost,
} from "../controllers/post.js";
router.post("/createPost", createPost);
router.get("/getFeedPosts", getFeedPosts);
router.get("/getUserPosts", getUserPosts);
router.post("/:id", likePost);

export default router;
