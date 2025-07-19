/*
  Warnings:

  - A unique constraint covering the columns `[gamecode]` on the table `Game` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gamecode` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "fen" TEXT NOT NULL DEFAULT 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
ADD COLUMN     "gamecode" TEXT NOT NULL,
ADD COLUMN     "movehistory" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'waiting',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Game_gamecode_key" ON "Game"("gamecode");
