/*
  Warnings:

  - Made the column `author` on table `Comment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Comment` MODIFY `author` VARCHAR(255) NOT NULL;
