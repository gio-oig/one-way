import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            phone: true,
          },
        },
        destinationCity: {
          include: {
            cityTranslations: true,
          },
        },
        originCity: {
          include: {
            cityTranslations: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "could not fetch posts" });
  }
}
