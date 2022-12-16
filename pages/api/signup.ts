import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, password } = req.body;

  try {
    const userExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userExists) {
      return res.status(500).json({ message: "user already exists" });
    }
  } catch (error) {
    return res.status(401).json({
      message: "something went wrong",
    });
  }

  try {
    let newUser: User;
    const salt = bcrypt.genSaltSync();

    newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: bcrypt.hashSync(password, salt),
      },
    });
    res.json({ message: "user has been created successfully" });
  } catch (error) {
    return res.status(401).json({
      message: "something went wrong",
    });
  }
}
