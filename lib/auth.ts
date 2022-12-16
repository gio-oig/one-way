import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { JwtBody, NextHandler } from "../types";
import prisma from "./prisma";

export const validateRoute = (handler: NextHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = extractToken(req);
    const secret = process.env.JWTSECRET;

    if (!secret) {
      return res.status(401).json({ error: "Authorizarion Failed" });
    }

    if (token) {
      let user: User | null;

      try {
        const { id } = jwt.verify(token, secret) as JwtBody;
        user = await prisma.user.findUnique({
          where: { id: +id },
        });

        if (!user) {
          throw new Error("Not real user");
        }
      } catch (error) {
        return res.status(401).json({ error: "Not Authorized" });
      }

      return handler(req, res, user);
    }

    return res.status(401).json({ error: "Not Authorized" });
  };
};

function extractToken(req: NextApiRequest) {
  const token = req.headers.authorization?.split(" ")[1];
  return token;
}

export function validateToken(token: string) {
  const tokenContent = jwt.verify(token, "hello");
  return tokenContent;
}

export function getToken(id: number) {
  const secret = getEnv("JWTSECRET");

  const TOKEN = jwt.sign({ id }, secret, {
    expiresIn: "1h",
  });

  return TOKEN;
}

function getEnv(key: string) {
  const val = process.env[key];
  if (!val) {
    throw new Error(`env [${key}] not set`);
  } else {
    return val;
  }
}
