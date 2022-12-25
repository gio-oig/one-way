-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('FOLLOWER', 'DRIVER');

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "phone" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "authorId" INTEGER NOT NULL,
    "numberOfPeople" INTEGER NOT NULL,
    "moveOutDate" TIMESTAMP(3) NOT NULL,
    "originCityId" INTEGER NOT NULL,
    "destinationCityId" INTEGER NOT NULL,
    "type" "PostType" NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_originCityId_fkey" FOREIGN KEY ("originCityId") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_destinationCityId_fkey" FOREIGN KEY ("destinationCityId") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
