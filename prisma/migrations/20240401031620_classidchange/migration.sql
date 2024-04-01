/*
  Warnings:

  - You are about to drop the column `classId` on the `Meetings` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Meetings" DROP CONSTRAINT "Meetings_classId_fkey";

-- AlterTable
ALTER TABLE "Meetings" DROP COLUMN "classId",
ADD COLUMN     "classid" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Meetings" ADD CONSTRAINT "Meetings_classid_fkey" FOREIGN KEY ("classid") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
