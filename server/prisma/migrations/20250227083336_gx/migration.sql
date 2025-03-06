-- CreateTable
CREATE TABLE `sys_scheduled_task` (
    `id` VARCHAR(50) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `target` VARCHAR(150) NOT NULL,
    `cron_expression` VARCHAR(100) NOT NULL,
    `order_num` INTEGER NOT NULL,
    `if_disabled` CHAR(1) NOT NULL,
    `remark` VARCHAR(300) NULL,
    `create_role` VARCHAR(30) NOT NULL,
    `update_role` VARCHAR(30) NOT NULL,
    `create_by` VARCHAR(10) NOT NULL,
    `update_by` VARCHAR(10) NOT NULL,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_time` DATETIME(3) NOT NULL,
    `deleted` CHAR(1) NOT NULL DEFAULT 'N',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `log_scheduled_task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tesk_id` INTEGER NOT NULL,
    `operate_type` VARCHAR(10) NOT NULL,
    `if_success` CHAR(1) NOT NULL,
    `remark` VARCHAR(100) NULL,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
