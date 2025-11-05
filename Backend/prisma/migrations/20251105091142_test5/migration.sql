/*
  Warnings:

  - You are about to drop the column `blogId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_blogId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "blogId";
