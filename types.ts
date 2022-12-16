import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export interface JwtBody {
  id: string;
}

export type NextHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  user: User
) => Promise<void>;
