/*
  Warnings:

  - You are about to drop the column `textContentId` on the `regions` table. All the data in the column will be lost.
  - You are about to drop the `Translation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `languages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `textContent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Translation" DROP CONSTRAINT "Translation_languageId_fkey";

-- DropForeignKey
ALTER TABLE "Translation" DROP CONSTRAINT "Translation_textContentId_fkey";

-- DropForeignKey
ALTER TABLE "regions" DROP CONSTRAINT "regions_textContentId_fkey";

-- DropForeignKey
ALTER TABLE "textContent" DROP CONSTRAINT "textContent_originalLanguageId_fkey";

-- AlterTable
ALTER TABLE "regions" DROP COLUMN "textContentId";

-- DropTable
DROP TABLE "Translation";

-- DropTable
DROP TABLE "languages";

-- DropTable
DROP TABLE "textContent";

-- CreateTable
CREATE TABLE "RegionTranslations" (
    "id" SERIAL NOT NULL,
    "languageCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "regionId" INTEGER NOT NULL,

    CONSTRAINT "RegionTranslations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RegionTranslations" ADD CONSTRAINT "RegionTranslations_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "regions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
