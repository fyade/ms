/*
  Warnings:

  - You are about to drop the column `tesk_id` on the `log_scheduled_task` table. All the data in the column will be lost.
  - Added the required column `task_id` to the `log_scheduled_task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `log_scheduled_task` DROP COLUMN `tesk_id`,
    ADD COLUMN `task_id` INTEGER NOT NULL;
