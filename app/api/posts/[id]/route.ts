import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//-----------------------------  FIND ONE POST ------------------------------
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const postId = Number(params.id);
  try {
    const getPost: object | null = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        id: true,
        title: true,
        content: true,
      },
    });

    if (!getPost) {
      return Response.json("No post found");
    }
    return Response.json(getPost);
  } catch (error) {
    console.log("error", error);
  }
}

//-----------------------------  UPDATE POST ------------------------------
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const postId = Number(params.id);
    const { title, content } = await request.json();
    const updatePost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title,
        content,
      },
    });
    return Response.json(updatePost);
  } catch (error) {
    return new Response(error as BodyInit, { status: 500 });
  }
}

//-----------------------------  DELETE POST ------------------------------
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const postId = Number(params.id);
    const deletePost = await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    return Response.json(`post ${postId} has been deleted`);
  } catch (error) {
    return new Response(error as BodyInit, { status: 500 });
  }
}
