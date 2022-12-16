import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id) {
    return res.status(401).json({ message: "please provide user id" });
  }

  try {
    const users = await prisma.user.findUnique({
      where: {
        id: +id,
      },
    });
    res.json({ data: users });
  } catch (error) {
    res.status(401).json({ message: "something went wrong" });
  }
}
