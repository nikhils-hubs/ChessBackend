/*
  Warnings:

  - The `movehistory` column on the `Game` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "winnerID" INTEGER,
DROP COLUMN "movehistory",
ADD COLUMN     "movehistory" JSONB NOT NULL DEFAULT '[]';
