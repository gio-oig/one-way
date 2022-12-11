-- CreateTable
CREATE TABLE "cityTranslations" (
    "id" SERIAL NOT NULL,
    "languageCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cityId" INTEGER NOT NULL,

    CONSTRAINT "cityTranslations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cityTranslations" ADD CONSTRAINT "cityTranslations_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
