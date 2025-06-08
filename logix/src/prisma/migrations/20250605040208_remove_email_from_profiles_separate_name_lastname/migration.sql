/*
  Warnings:

  - You are about to drop the column `email` on the `StudentProfile` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `StudentProfile` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `TeacherProfile` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `TeacherProfile` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `StudentProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `StudentProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `TeacherProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `TeacherProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "StudentProfile_email_key";

-- DropIndex
DROP INDEX "TeacherProfile_email_key";

-- AlterTable
ALTER TABLE "StudentProfile" DROP COLUMN "email",
DROP COLUMN "name",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TeacherProfile" DROP COLUMN "email",
DROP COLUMN "name",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;
