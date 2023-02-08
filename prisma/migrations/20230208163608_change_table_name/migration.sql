/*
  Warnings:

  - You are about to drop the `SavedTweets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SavedTweets" DROP CONSTRAINT "SavedTweets_userId_fkey";

-- DropTable
DROP TABLE "SavedTweets";

-- CreateTable
CREATE TABLE "SavedTweet" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tweet" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SavedTweet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SavedTweet" ADD CONSTRAINT "SavedTweet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
