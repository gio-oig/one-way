import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const senakiCity = await prisma.city.findMany({
    // where: {},
    include: {
      region: {
        include: {
          RegionTranslations: {
            select: {
              name: true,
            },
          },
        },
      },
      CityTranslations: {
        select: {
          name: true,
        },
      },
    },
  });

  return res.json({ data: senakiCity });
}
