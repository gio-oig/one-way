/*
  Warnings:

  - You are about to drop the column `LanguageId` on the `textContent` table. All the data in the column will be lost.
  - Added the required column `originalLanguageId` to the `textContent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "textContent" DROP CONSTRAINT "textContent_LanguageId_fkey";

-- AlterTable
ALTER TABLE "textContent" DROP COLUMN "LanguageId",
ADD COLUMN     "originalLanguageId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "textContent" ADD CONSTRAINT "textContent_originalLanguageId_fkey" FOREIGN KEY ("originalLanguageId") REFERENCES "languages"("languageId") ON DELETE RESTRICT ON UPDATE CASCADE;
