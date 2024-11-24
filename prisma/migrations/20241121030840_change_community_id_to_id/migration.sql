/*
  Warnings:

  - The primary key for the `UserCommunitys` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `communityID` on the `UserCommunitys` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[communityId]` on the table `UserCommunitys` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `communityId` to the `UserCommunitys` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserCommunitys" DROP CONSTRAINT "UserCommunitys_communityID_fkey";

-- DropIndex
DROP INDEX "UserCommunitys_communityID_key";

-- AlterTable
ALTER TABLE "UserCommunitys" DROP CONSTRAINT "UserCommunitys_pkey",
DROP COLUMN "communityID",
ADD COLUMN     "communityId" INTEGER NOT NULL,
ADD CONSTRAINT "UserCommunitys_pkey" PRIMARY KEY ("userId", "communityId");

-- CreateIndex
CREATE UNIQUE INDEX "UserCommunitys_communityId_key" ON "UserCommunitys"("communityId");

-- AddForeignKey
ALTER TABLE "UserCommunitys" ADD CONSTRAINT "UserCommunitys_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
