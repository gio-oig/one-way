/*
  Warnings:

  - You are about to drop the `RegionTranslations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RegionTranslations" DROP CONSTRAINT "RegionTranslations_regionId_fkey";

-- DropTable
DROP TABLE "RegionTranslations";

-- CreateTable
CREATE TABLE "regionTranslations" (
    "id" SERIAL NOT NULL,
    "languageCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "regionId" INTEGER NOT NULL,

    CONSTRAINT "regionTranslations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "regionTranslations" ADD CONSTRAINT "regionTranslations_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "regions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
