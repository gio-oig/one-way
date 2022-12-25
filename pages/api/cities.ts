import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cities = await prisma.city.findMany({
    include: {
      cityTranslations: {
        where: {
          languageCode: "ge",
        },
        select: {
          name: true,
        },
      },
    },
  });

  const formatedCities = cities.map((city) => {
    const { id, regionId, cityTranslations } = city;
    return {
      id,
      regionId,
      name: cityTranslations[0].name,
    };
  });

  return res.json(formatedCities);
}
