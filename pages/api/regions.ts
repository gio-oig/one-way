import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: any;
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const regions = await prisma.region.findMany({
    include: {
      City: {
        include: {
          CityTranslations: true,
        },
      },
      RegionTranslations: {
        where: {
          languageCode: "ge",
        },
      },
    },
  });

  const mapped = regions.map((region) => ({
    id: region.id,
    name: region.RegionTranslations[0].name,
  }));

  res.status(200).json({ data: regions });
}
