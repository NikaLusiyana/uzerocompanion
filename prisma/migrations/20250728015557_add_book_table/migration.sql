-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "progress" INTEGER NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "cover" TEXT,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
