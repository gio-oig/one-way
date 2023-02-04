import { PostType, Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    originCityId,
    destinationCityId,
    moveOutDate,
    numberOfPeople,
    postType,
  } = req.query;
  console.log(req.query);

  const filterPostQuery: Prisma.PostFindManyArgs = {
    where: {},
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
  };

  if (originCityId) {
    filterPostQuery.where!.originCityId = +originCityId;
  }

  if (destinationCityId) {
    filterPostQuery.where!.destinationCityId = +destinationCityId;
  }

  if (moveOutDate && typeof moveOutDate === "string") {
    const date = new Date(moveOutDate);

    filterPostQuery.where!.moveOutDate = {
      equals: date.toISOString(),
    };
  }

  if (postType) {
    filterPostQuery.where!.type = postType as PostType;
  }

  if (numberOfPeople) {
    filterPostQuery.where!.numberOfPeople = +numberOfPeople;
  }

  try {
    const posts = await prisma.post.findMany(filterPostQuery);
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "could not fetch posts" });
  }
}
