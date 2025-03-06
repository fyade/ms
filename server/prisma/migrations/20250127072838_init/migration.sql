-- CreateTable
CREATE TABLE `sys_user` (
    `id` VARCHAR(10) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `nickname` VARCHAR(50) NULL,
    `password` VARCHAR(100) NOT NULL,
    `avatar` VARCHAR(200) NULL,
    `sex` VARCHAR(10) NULL,
    `email` VARCHAR(50) NULL,
    `tel` VARCHAR(15) NULL,
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
CREATE TABLE `sys_user_visitor` (
    `id` VARCHAR(10) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `nickname` VARCHAR(50) NULL,
    `password` VARCHAR(100) NOT NULL,
    `avatar` VARCHAR(200) NULL,
    `sex` VARCHAR(10) NULL,
    `email` VARCHAR(50) NULL,
    `tel` VARCHAR(15) NULL,
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
CREATE TABLE `sys_user_table_default_permission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `table_name` VARCHAR(50) NOT NULL,
    `perm_type` VARCHAR(2) NOT NULL,
    `perm_id` INTEGER NOT NULL,
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
CREATE TABLE `sys_dic_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `type` VARCHAR(50) NOT NULL,
    `if_disabled` CHAR(1) NOT NULL,
    `order_num` INTEGER NOT NULL,
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
CREATE TABLE `sys_dic_data` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(50) NOT NULL,
    `value` VARCHAR(50) NOT NULL,
    `dic_type_id` INTEGER NOT NULL,
    `if_default` CHAR(1) NOT NULL,
    `if_disabled` CHAR(1) NOT NULL,
    `order_num` INTEGER NOT NULL,
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
CREATE TABLE `sys_code_gen_table` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `table_name` VARCHAR(60) NOT NULL,
    `table_descr` VARCHAR(100) NOT NULL,
    `entity_name` VARCHAR(60) NOT NULL,
    `table_remark` VARCHAR(300) NULL,
    `business_name` VARCHAR(60) NOT NULL,
    `module_name` VARCHAR(60) NOT NULL,
    `business_name_cn` VARCHAR(60) NOT NULL,
    `module_name_cn` VARCHAR(60) NOT NULL,
    `sys_id` INTEGER NOT NULL,
    `order_num` INTEGER NOT NULL,
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
CREATE TABLE `sys_code_gen_column` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `table_id` INTEGER NOT NULL,
    `col_name` VARCHAR(60) NOT NULL,
    `col_descr` VARCHAR(60) NOT NULL,
    `mysql_type` VARCHAR(60) NOT NULL,
    `ts_type` VARCHAR(10) NOT NULL,
    `ts_name` VARCHAR(60) NOT NULL,
    `if_ins` CHAR(1) NOT NULL,
    `if_upd` CHAR(1) NOT NULL,
    `if_sel_one` CHAR(1) NOT NULL,
    `if_sel_more` CHAR(1) NOT NULL,
    `if_required` CHAR(1) NOT NULL,
    `sel_type` VARCHAR(10) NOT NULL,
    `form_type` VARCHAR(20) NOT NULL,
    `order_num` INTEGER NOT NULL,
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
CREATE TABLE `sys_admin_top` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(10) NOT NULL,
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
CREATE TABLE `sys_menu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(30) NOT NULL,
    `type` VARCHAR(2) NOT NULL,
    `path` VARCHAR(100) NOT NULL,
    `parent_id` INTEGER NOT NULL,
    `component` VARCHAR(60) NOT NULL,
    `icon` VARCHAR(30) NOT NULL,
    `order_num` INTEGER NOT NULL,
    `if_link` CHAR(1) NOT NULL,
    `if_visible` CHAR(1) NOT NULL,
    `if_disabled` CHAR(1) NOT NULL,
    `if_public` CHAR(1) NOT NULL,
    `if_fixed` CHAR(1) NOT NULL,
    `perms` VARCHAR(100) NOT NULL,
    `sys_id` INTEGER NOT NULL,
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
CREATE TABLE `sys_role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(30) NOT NULL,
    `if_admin` CHAR(1) NOT NULL,
    `if_disabled` CHAR(1) NOT NULL,
    `order_num` INTEGER NOT NULL,
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
CREATE TABLE `sys_user_role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(10) NOT NULL,
    `role_id` INTEGER NOT NULL,
    `login_role` VARCHAR(30) NOT NULL,
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
CREATE TABLE `sys_role_permission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_id` INTEGER NOT NULL,
    `permission_id` INTEGER NOT NULL,
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
CREATE TABLE `sys_dept` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(50) NOT NULL,
    `if_admin` CHAR(1) NOT NULL,
    `if_disabled` CHAR(1) NOT NULL,
    `parent_id` INTEGER NOT NULL,
    `order_num` INTEGER NOT NULL,
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
CREATE TABLE `sys_user_dept` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(10) NOT NULL,
    `dept_id` INTEGER NOT NULL,
    `login_role` VARCHAR(30) NOT NULL,
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
CREATE TABLE `sys_dept_permission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dept_id` INTEGER NOT NULL,
    `permission_id` INTEGER NOT NULL,
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
CREATE TABLE `sys_sys` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(300) NOT NULL,
    `perms` VARCHAR(100) NOT NULL,
    `order_num` INTEGER NOT NULL,
    `path` VARCHAR(100) NOT NULL,
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
CREATE TABLE `sys_role_sys` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_id` INTEGER NOT NULL,
    `sys_id` INTEGER NOT NULL,
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
CREATE TABLE `sys_dept_sys` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dept_id` INTEGER NOT NULL,
    `sys_id` INTEGER NOT NULL,
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
CREATE TABLE `sys_menu_ip_white_list` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `menu_id` INTEGER NOT NULL,
    `white_list` VARCHAR(100) NOT NULL,
    `from_type` VARCHAR(2) NOT NULL,
    `type` VARCHAR(2) NOT NULL,
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
CREATE TABLE `sys_table_row_permission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `permission_id` INTEGER NOT NULL,
    `action_type` VARCHAR(20) NOT NULL,
    `action_id` VARCHAR(20) NOT NULL,
    `data_type` VARCHAR(20) NOT NULL,
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
CREATE TABLE `sys_user_group` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(30) NOT NULL,
    `parent_id` INTEGER NOT NULL,
    `order_num` INTEGER NOT NULL,
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
CREATE TABLE `sys_user_user_group` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(10) NOT NULL,
    `user_group_id` INTEGER NOT NULL,
    `login_role` VARCHAR(30) NOT NULL,
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
CREATE TABLE `sys_interface` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(30) NOT NULL,
    `icon` VARCHAR(30) NOT NULL,
    `order_num` INTEGER NOT NULL,
    `if_disabled` CHAR(1) NOT NULL,
    `if_public` CHAR(1) NOT NULL,
    `perms` VARCHAR(100) NOT NULL,
    `url` VARCHAR(100) NOT NULL,
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
CREATE TABLE `sys_interface_group` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(30) NOT NULL,
    `parent_id` INTEGER NOT NULL,
    `perms` VARCHAR(100) NOT NULL,
    `base_u_r_l` VARCHAR(300) NOT NULL,
    `order_num` INTEGER NOT NULL,
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
CREATE TABLE `sys_interface_interface_group` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `interface_id` INTEGER NOT NULL,
    `interface_group_id` INTEGER NOT NULL,
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
CREATE TABLE `sys_user_group_permission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_group_id` INTEGER NOT NULL,
    `permission_id` INTEGER NOT NULL,
    `if_long_term` CHAR(1) NOT NULL,
    `if_limit_request_times` CHAR(1) NOT NULL,
    `if_reject_request_use_up` CHAR(1) NOT NULL,
    `permission_start_time` DATETIME(3) NOT NULL,
    `permission_end_time` DATETIME(3) NOT NULL,
    `limit_request_times` INTEGER NOT NULL,
    `if_use_up` CHAR(1) NOT NULL DEFAULT 'N',
    `order_num` INTEGER NOT NULL,
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
CREATE TABLE `tbl_file` (
    `id` VARCHAR(50) NOT NULL,
    `file_name` VARCHAR(200) NOT NULL,
    `file_new_name` VARCHAR(200) NOT NULL,
    `file_size` BIGINT NOT NULL,
    `file_md5` VARCHAR(50) NOT NULL,
    `if_chunk` CHAR(1) NOT NULL,
    `chunk_num` INTEGER NULL,
    `if_merge` CHAR(1) NULL,
    `if_first` CHAR(1) NOT NULL,
    `if_finished` CHAR(1) NOT NULL,
    `module` VARCHAR(50) NULL,
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
CREATE TABLE `tbl_file_chunk` (
    `id` VARCHAR(50) NOT NULL,
    `file_md5` VARCHAR(50) NOT NULL,
    `file_new_name` VARCHAR(200) NOT NULL,
    `chunk_name` VARCHAR(200) NOT NULL,
    `chunk_index` INTEGER NOT NULL,
    `if_finished` CHAR(1) NOT NULL,
    `remark` VARCHAR(300) NULL,
    `create_role` VARCHAR(30) NOT NULL,
    `create_by` VARCHAR(10) NOT NULL,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted` CHAR(1) NOT NULL DEFAULT 'N',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_bulletin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `content` VARCHAR(500) NOT NULL,
    `type` VARCHAR(5) NOT NULL,
    `if_top` CHAR(1) NOT NULL,
    `if_pin` CHAR(1) NOT NULL,
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
CREATE TABLE `tbl_bulletin_read` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bulletin_id` INTEGER NOT NULL,
    `user_id` VARCHAR(10) NOT NULL,
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
CREATE TABLE `log_user_login` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(10) NOT NULL,
    `login_ip` VARCHAR(20) NOT NULL,
    `login_position` VARCHAR(30) NOT NULL,
    `login_browser` VARCHAR(30) NOT NULL,
    `login_os` VARCHAR(30) NOT NULL,
    `if_success` CHAR(1) NOT NULL,
    `fail_type` VARCHAR(20) NOT NULL,
    `login_role` VARCHAR(30) NOT NULL,
    `remark` VARCHAR(100) NULL,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `log_operation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `req_id` VARCHAR(40) NOT NULL,
    `call_ip` VARCHAR(20) NOT NULL,
    `host_name` VARCHAR(100) NOT NULL,
    `perms` VARCHAR(100) NOT NULL,
    `user_id` VARCHAR(10) NOT NULL,
    `req_param` TEXT NOT NULL,
    `old_value` TEXT NOT NULL,
    `operate_type` VARCHAR(10) NOT NULL,
    `if_success` CHAR(1) NOT NULL,
    `login_role` VARCHAR(30) NOT NULL,
    `remark` VARCHAR(100) NULL,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `log_algorithm_call` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_group_permission_id` INTEGER NOT NULL,
    `pperms` VARCHAR(100) NOT NULL,
    `perms` VARCHAR(100) NOT NULL,
    `user_id` VARCHAR(10) NOT NULL,
    `call_ip` VARCHAR(20) NOT NULL,
    `if_success` CHAR(1) NOT NULL,
    `login_role` VARCHAR(30) NOT NULL,
    `remark` VARCHAR(100) NULL,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sys_dic_data` ADD CONSTRAINT `sys_dic_data_dic_type_id_fkey` FOREIGN KEY (`dic_type_id`) REFERENCES `sys_dic_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_code_gen_table` ADD CONSTRAINT `sys_code_gen_table_sys_id_fkey` FOREIGN KEY (`sys_id`) REFERENCES `sys_sys`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_code_gen_column` ADD CONSTRAINT `sys_code_gen_column_table_id_fkey` FOREIGN KEY (`table_id`) REFERENCES `sys_code_gen_table`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_admin_top` ADD CONSTRAINT `sys_admin_top_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `sys_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_menu` ADD CONSTRAINT `sys_menu_sys_id_fkey` FOREIGN KEY (`sys_id`) REFERENCES `sys_sys`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_user_role` ADD CONSTRAINT `sys_user_role_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `sys_role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_role_permission` ADD CONSTRAINT `sys_role_permission_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `sys_role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_role_permission` ADD CONSTRAINT `sys_role_permission_permission_id_fkey` FOREIGN KEY (`permission_id`) REFERENCES `sys_menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_user_dept` ADD CONSTRAINT `sys_user_dept_dept_id_fkey` FOREIGN KEY (`dept_id`) REFERENCES `sys_dept`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_dept_permission` ADD CONSTRAINT `sys_dept_permission_dept_id_fkey` FOREIGN KEY (`dept_id`) REFERENCES `sys_dept`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_dept_permission` ADD CONSTRAINT `sys_dept_permission_permission_id_fkey` FOREIGN KEY (`permission_id`) REFERENCES `sys_menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_role_sys` ADD CONSTRAINT `sys_role_sys_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `sys_role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_role_sys` ADD CONSTRAINT `sys_role_sys_sys_id_fkey` FOREIGN KEY (`sys_id`) REFERENCES `sys_sys`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_dept_sys` ADD CONSTRAINT `sys_dept_sys_dept_id_fkey` FOREIGN KEY (`dept_id`) REFERENCES `sys_dept`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_dept_sys` ADD CONSTRAINT `sys_dept_sys_sys_id_fkey` FOREIGN KEY (`sys_id`) REFERENCES `sys_sys`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_menu_ip_white_list` ADD CONSTRAINT `sys_menu_ip_white_list_menu_id_fkey` FOREIGN KEY (`menu_id`) REFERENCES `sys_menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_table_row_permission` ADD CONSTRAINT `sys_table_row_permission_permission_id_fkey` FOREIGN KEY (`permission_id`) REFERENCES `sys_menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_user_user_group` ADD CONSTRAINT `sys_user_user_group_user_group_id_fkey` FOREIGN KEY (`user_group_id`) REFERENCES `sys_user_group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_interface_interface_group` ADD CONSTRAINT `sys_interface_interface_group_interface_id_fkey` FOREIGN KEY (`interface_id`) REFERENCES `sys_interface`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_interface_interface_group` ADD CONSTRAINT `sys_interface_interface_group_interface_group_id_fkey` FOREIGN KEY (`interface_group_id`) REFERENCES `sys_interface_group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_user_group_permission` ADD CONSTRAINT `sys_user_group_permission_user_group_id_fkey` FOREIGN KEY (`user_group_id`) REFERENCES `sys_user_group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_user_group_permission` ADD CONSTRAINT `sys_user_group_permission_permission_id_fkey` FOREIGN KEY (`permission_id`) REFERENCES `sys_interface_group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `log_algorithm_call` ADD CONSTRAINT `log_algorithm_call_user_group_permission_id_fkey` FOREIGN KEY (`user_group_permission_id`) REFERENCES `sys_user_group_permission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
