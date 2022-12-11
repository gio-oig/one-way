import { PrismaClient } from "@prisma/client";
import { Location, regionsWithCities } from "./locationsData";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const regions = [
  "სამეგრელო",
  "აჭარა",
  "გურია",
  "აფხაზეთი",
  "სვანეთი",
  "იმერეთი",
];
const cities = ["სენაკი", "ფოთი", "ბათუმი", "ქობულეთი"];

const createRegions = async (region: string) => {
  return await prisma.region.create({
    data: {
      RegionTranslations: {
        create: {
          languageCode: "ge",
          name: region,
        },
      },
    },
  });
};

const createCities = async (locationsData: Location[]) => {
  for (let location of locationsData) {
    const region = await prisma.region.create({
      data: {
        RegionTranslations: {
          create: {
            languageCode: "ge",
            name: location.region,
          },
        },
      },
    });

    for (let city of location.cities) {
      await prisma.city.create({
        data: {
          CityTranslations: {
            create: {
              languageCode: "ge",
              name: city,
            },
          },
          regionId: region.id,
        },
      });
    }
  }
};

async function createUser(email: string, password: string) {
  const salt = bcrypt.genSaltSync();

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: "Giorgi",
      password: bcrypt.hashSync(password, salt),
    },
  });

  return user;
}

const run = async () => {
  // await Promise.all(regions.map(createRegions));
  createCities(regionsWithCities);
  const user = await createUser("user@test.com", "password");

  const senakiCity = await prisma.city.findFirst({
    include: {
      CityTranslations: {
        where: {
          name: "სენაკი",
        },
      },
    },
  });
  const potiCity = await prisma.city.findFirst({
    include: {
      CityTranslations: {
        where: {
          name: "ფოთი",
        },
      },
    },
  });

  if (senakiCity && potiCity) {
    await prisma.post.create({
      data: {
        authorId: user.id,
        originCityId: senakiCity.id,
        destinationCityId: potiCity.id,
        numberOfPeople: 3,
        moveOutDate: new Date(),
      },
    });
  }
};

run()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
