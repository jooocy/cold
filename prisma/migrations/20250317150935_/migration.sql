/*
  Warnings:

  - The primary key for the `LinkUser` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "LinkUser" DROP CONSTRAINT "LinkUser_pkey",
ADD CONSTRAINT "LinkUser_pkey" PRIMARY KEY ("linkId", "userId");
