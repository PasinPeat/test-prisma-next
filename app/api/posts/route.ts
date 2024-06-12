import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, res: Response) {
  try {
    const posts = await prisma.post.findMany();

    return Response.json(posts);
  } catch (error) {
    console.log("error", error);
  }
}

export async function POST(req: Request, res: Response) {
  try {
    const { title, content } = await req.json();

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
      },
    });

    return Response.json({
      message: "Post successfully created",
      newPost,
    });
  } catch (error) {
    console.log("error", error);
  }
}

