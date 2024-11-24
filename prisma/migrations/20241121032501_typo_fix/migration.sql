/*
  Warnings:

  - You are about to drop the `UserCommunitys` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserCommunitys" DROP CONSTRAINT "UserCommunitys_communityId_fkey";

-- DropForeignKey
ALTER TABLE "UserCommunitys" DROP CONSTRAINT "UserCommunitys_userId_fkey";

-- DropTable
DROP TABLE "UserCommunitys";

-- CreateTable
CREATE TABLE "UserCommunities" (
    "userId" INTEGER NOT NULL,
    "communityId" INTEGER NOT NULL,

    CONSTRAINT "UserCommunities_pkey" PRIMARY KEY ("userId","communityId")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserCommunities_communityId_key" ON "UserCommunities"("communityId");

-- AddForeignKey
ALTER TABLE "UserCommunities" ADD CONSTRAINT "UserCommunities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCommunities" ADD CONSTRAINT "UserCommunities_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
