/*
  Warnings:

  - A unique constraint covering the columns `[communityID]` on the table `UserCommunitys` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "UserCommunitys_communityID_key" ON "UserCommunitys"("communityID");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
