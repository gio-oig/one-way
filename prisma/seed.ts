import { PostType, PrismaClient } from "@prisma/client";
import { Location, regionsWithCities } from "./locationsData";
import bcrypt from "bcrypt";
import { getRandomitem } from "./helperFunctions";
import { postDescriptions } from "./seedData";

const prisma = new PrismaClient();

// const regions = [
//   "სამეგრელო",
//   "აჭარა",
//   "გურია",
//   "აფხაზეთი",
//   "სვანეთი",
//   "იმერეთი",
// ];
// const cities = ["სენაკი", "ფოთი", "ბათუმი", "ქობულეთი"];

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
          cityTranslations: {
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
  // await createCities(regionsWithCities);
  // const user = await createUser("user@test.com", "password");

  const cities = await prisma.city.findMany({
    include: {
      cityTranslations: true,
    },
  });
  console.log(cities);

  for (let city of cities) {
    const destinationCity = getRandomitem(cities);

    await prisma.post.create({
      data: {
        authorId: 1,
        originCityId: city.id,
        destinationCityId: destinationCity.id,
        description: getRandomitem(postDescriptions),
        numberOfPeople: Math.floor(Math.random() * 10) || 2,
        moveOutDate: new Date(),
        type: Math.random() > 0.5 ? PostType.DRIVER : PostType.FOLLOWER,
        phone: "557 44 11 90",
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
