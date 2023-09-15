import { Schema, model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
}

export interface IUserInternal extends IUser {
  password: string;
}


const userSchema = new Schema<IUserInternal>({
  name: { type: String, unique: true, require: true },
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true }
},
  { timestamps: true }
);

export default model("User", userSchema);