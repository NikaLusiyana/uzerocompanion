/*
  Warnings:

  - You are about to drop the column `targetWords` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "targetWords",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "sinopsis" TEXT,
ADD COLUMN     "targetWordCount" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "progress" SET DEFAULT 0;
