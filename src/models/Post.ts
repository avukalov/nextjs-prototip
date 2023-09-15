import { Schema, model, models, Types } from "mongoose";

export interface IPost {
  _id: Types.ObjectId;
  title: string;
  desc: string;
  image: string;
  content: string;
  username: string;
}

const postSchema = new Schema<IPost>({
  title: { type: String, require: true },
  desc: { type: String, require: true },
  image: { type: String, require: true },
  content: { type: String, require: true },
  username: { type: String, require: true }
},
  { timestamps: true, collection: "posts" }
);

const Post = models.Post || model<IPost>("Post", postSchema);

export default Post;