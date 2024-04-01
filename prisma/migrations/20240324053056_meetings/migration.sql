/*
  Warnings:

  - Added the required column `meetingType` to the `Meetings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Meetings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Meetings" ADD COLUMN     "meetingType" TEXT NOT NULL,
ADD COLUMN     "status" INTEGER NOT NULL;
