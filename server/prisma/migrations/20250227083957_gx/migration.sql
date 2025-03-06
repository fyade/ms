/*
  Warnings:

  - The primary key for the `sys_scheduled_task` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `sys_scheduled_task` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `Int`.

*/
-- AlterTable
ALTER TABLE `sys_scheduled_task` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
