import Post, { IPost } from "@/models/Post";
import connect from "@/utils/db"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest, { params }: { params: any }) => {
  const { id } = params;

  try {
    await connect();

    const post = await Post.findById(id) as IPost;

    return new NextResponse<IPost>(JSON.stringify(post), { status: 200 })
  } catch (error) {
    return new NextResponse("Database error", { status: 500 })
  }

}