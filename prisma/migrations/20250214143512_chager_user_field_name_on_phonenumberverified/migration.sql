/*
  Warnings:

  - You are about to drop the column `phoneNumberVerified` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "phoneNumberVerified",
ADD COLUMN     "isPhoneNumberVerified" BOOLEAN NOT NULL DEFAULT false;
