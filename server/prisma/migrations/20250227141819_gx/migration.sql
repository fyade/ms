/*
  Warnings:

  - You are about to drop the column `task_name` on the `log_scheduled_task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `log_scheduled_task` DROP COLUMN `task_name`;
