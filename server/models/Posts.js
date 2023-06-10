import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      likes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    comments: {
      type: [],
      default: [],
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("post", postSchema);
