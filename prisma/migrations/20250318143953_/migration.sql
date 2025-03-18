-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastActiveLinkId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_lastActiveLinkId_fkey" FOREIGN KEY ("lastActiveLinkId") REFERENCES "Link"("id") ON DELETE SET NULL ON UPDATE CASCADE;
