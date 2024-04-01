/*
  Warnings:

  - You are about to drop the column `classid` on the `Meetings` table. All the data in the column will be lost.
  - Added the required column `classId` to the `Meetings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Meetings" DROP CONSTRAINT "Meetings_classid_fkey";

-- AlterTable
ALTER TABLE "Meetings" DROP COLUMN "classid",
ADD COLUMN     "classId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Meetings" ADD CONSTRAINT "Meetings_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
