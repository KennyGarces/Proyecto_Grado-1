/*
  Warnings:

  - A unique constraint covering the columns `[authId]` on the table `StudentProfile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[authId]` on the table `TeacherProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authId` to the `StudentProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authId` to the `TeacherProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudentProfile" ADD COLUMN     "authId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TeacherProfile" ADD COLUMN     "authId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfile_authId_key" ON "StudentProfile"("authId");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherProfile_authId_key" ON "TeacherProfile"("authId");
