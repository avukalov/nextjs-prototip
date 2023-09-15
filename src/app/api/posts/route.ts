import Post, { IPost } from "@/models/Post";
import connect from "@/utils/db"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  const username = url.searchParams.get("username")
  try {
    await connect();

    const posts = await Post.find({ username }) as IPost[];


    return new NextResponse<IPost[]>(JSON.stringify(posts), { status: 200 })
  } catch (error) {
    return new NextResponse("Database error", { status: 500 })
  }

}

