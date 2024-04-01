/*
  Warnings:

  - Added the required column `meetingName` to the `Meetings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Meetings" ADD COLUMN     "meetingName" TEXT NOT NULL;
