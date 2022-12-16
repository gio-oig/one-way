import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";
import { getToken } from "../../lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!existingUser) {
    return res.status(401).json({ message: "user does not exist" });
  }

  const validPassword = await bcrypt.compare(password, existingUser.password);
  if (!validPassword) {
    return res.status(401).json({ message: "email or password is incorrect" });
  }

  const token = getToken(existingUser.id);

  return res.json({ message: "successfully logged in", token });
}
