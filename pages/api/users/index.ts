import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const users = await prisma.user.findMany({});
    res.json({ data: users });
  } catch (error) {
    res.status(401).json({ message: "something went wrong" });
  }
}
