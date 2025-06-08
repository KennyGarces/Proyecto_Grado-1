/*
  Warnings:

  - Changed the type of `authId` on the `StudentProfile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `authId` on the `TeacherProfile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "StudentProfile" DROP COLUMN "authId",
ADD COLUMN     "authId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "TeacherProfile" DROP COLUMN "authId",
ADD COLUMN     "authId" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfile_authId_key" ON "StudentProfile"("authId");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherProfile_authId_key" ON "TeacherProfile"("authId");
