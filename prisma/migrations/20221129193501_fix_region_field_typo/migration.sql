/*
  Warnings:

  - You are about to drop the column `name` on the `regions` table. All the data in the column will be lost.
  - Added the required column `textContentId` to the `regions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "regions" DROP COLUMN "name",
ADD COLUMN     "textContentId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "languages" (
    "languageId" TEXT NOT NULL,
    "languageName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "textContent" (
    "id" SERIAL NOT NULL,
    "originalText" TEXT NOT NULL,
    "LanguageId" TEXT NOT NULL,

    CONSTRAINT "textContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Translation" (
    "textContentId" INTEGER NOT NULL,
    "languageId" TEXT NOT NULL,
    "translation" TEXT NOT NULL,

    CONSTRAINT "Translation_pkey" PRIMARY KEY ("textContentId","languageId")
);

-- CreateIndex
CREATE UNIQUE INDEX "languages_languageId_key" ON "languages"("languageId");

-- AddForeignKey
ALTER TABLE "regions" ADD CONSTRAINT "regions_textContentId_fkey" FOREIGN KEY ("textContentId") REFERENCES "textContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "textContent" ADD CONSTRAINT "textContent_LanguageId_fkey" FOREIGN KEY ("LanguageId") REFERENCES "languages"("languageId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_textContentId_fkey" FOREIGN KEY ("textContentId") REFERENCES "textContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "languages"("languageId") ON DELETE RESTRICT ON UPDATE CASCADE;
