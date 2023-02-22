/*
  Warnings:

  - A unique constraint covering the columns `[tweet]` on the table `SavedTweet` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SavedTweet_tweet_key" ON "SavedTweet"("tweet");
