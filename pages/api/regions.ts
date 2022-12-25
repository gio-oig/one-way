import prisma from "lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const regions = await prisma.region.findMany({
    include: {
      City: {
        include: {
          cityTranslations: true,
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

  res.status(200).json(mapped);
}
