import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      authSource: "admin",
      dbName: "nextjs-tutorial"
    })
  } catch (error) {
    throw new Error("Mongodb connection failed!")
  }
}

export default connect;