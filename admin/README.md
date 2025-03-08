## 二开注意事项

- 本项目中未对 DTO、VO、POJO、ENTITY 等做区分，均使用 DTO

## 运行教程

注：

- 项目根目录指的是整个项目根目录
- 模块根目录指的是项目根目录/本项目所在的子文件夹
- 配置模块根目录指的是项目根目录/配置模块所在的子文件夹（默认是项目根目录/config）

若已初始化过，则可直接在项目根目录运行 `pnpm "[dev] [admin ] dev"` 命令，然后下面步骤可忽略。

1. 安装依赖

在项目根目录运行命令 `pnpm install`；

2. 配置

在 配置模块根目录/config 目录中，新建 publicConfig.ts，将 publicConfig.txt 中的内容粘贴至 publicConfig.ts；

在 配置模块根目录/config 目录中，新建 adminConfig.ts，将 adminConfig.txt 中的内容粘贴至 adminConfig.ts；

在 配置模块根目录/config/publicConfig.ts 中，根据注释，将每个配置改为自己的配置；

在 配置模块根目录/config/adminConfig.ts 中，根据注释，将每个配置改为自己的配置；

3. 启动项目

在项目根目录运行 `pnpm "[dev] [admin ] dev"` 命令。

## 打包教程

注意：以生产环境为例子：在 配置模块根目录/adminConfig.ts 中有一个变量，叫 config，其第一个键为 dev，表示开发环境的配置，接下来你需要加一个键 prod，表示生产环境的配置，然后你需要把 dev 的值复制进去并修改为生产环境的配置；

注意：若修改了配置，需要在打包前先构造一下配置模块；

随后在项目根目录运行 `pnpm "[build] [admin ] build:prod"` 命令。

## 其他注意事项

菜单相关常量：

* mm 表示菜单
* mc 表示组件
* ma 表示接口组
* mb 表示接口

菜单 ip 限制相关常量：

* ip 表示 ip
* ho 表示 host

权限身份类型相关常量：

* ro 表示角色
* de 表示部门
* ug 表示用户组

数据表行(háng)权限管理相关常量：

* ALL 表示全部
* SELF_DEPT 表示本部门
* DEPT_ONE_SON 表示本部门及直属子部门
* DEPT_ALL_SON 表示本部门及全部子部门
* SELF_ROLE 表示本角色
* SELF 表示自己

图标风格：

* 图标大小：16
* 线段粗细：2
* 图标风格：线性
* 描边颜色：#333
