<script setup lang="ts">
import Aside from "@/layout/sys/aside.vue";
import { useRoute } from "vue-router";
import { AllMenus2I, useRouterStore } from "@/store/module/router.ts";
import { computed, useTemplateRef } from "vue";
import PublicIndex from "@/layout/publicIndex.vue";
import { useSysConfigStore } from "@/store/module/sysConfig.ts";
import { useSysStore } from "@/store/module/sys.ts";

const route = useRoute()
const routerStore = useRouterStore();
const sysStore = useSysStore();
const aside = useTemplateRef<InstanceType<typeof Aside>>('aside')

const homeRouter = computed(() => {
  return `/${sysStore.getCurrentSystem.path}`
})

const gotoMenu = (path: string) => {
  aside.value && aside.value.gotoMenu(path)
}
const deleteMenu = (index: number) => {
  if (route.path === routerStore.getMenuList()[index].path) {
    aside.value && aside.value.gotoMenu(homeRouter.value)
  }
  routerStore.deleteMenu(index)
}

const contextMenu = (info: AllMenus2I, index: number) => [
  [
    {
      label: '关闭此标签页',
      operate: () => {
        if (routerStore.getFixedMenus(sysStore.getCurrentSystem.perms).indexOf(info.path) > -1) {
          return
        }
        deleteMenu(index)
      }
    },
    {
      label: '关闭左侧标签页',
      operate: () => {
        if (routerStore.getMenuList().slice(0, index).findIndex(item => item.path === route.path) > -1) {
          aside.value && aside.value.gotoMenu(homeRouter.value)
        }
        routerStore.deleteLeftMenu(index)
      }
    },
    {
      label: '关闭右侧标签页',
      operate: () => {
        if (routerStore.getMenuList().slice(index + 1, routerStore.getMenuList().length).findIndex(item => item.path === route.path) > -1) {
          aside.value && aside.value.gotoMenu(homeRouter.value)
        }
        routerStore.deleteRightMenu(index)
      }
    },
    {
      label: '关闭其他标签页',
      operate: () => {
        if (route.path !== info.path) {
          aside.value && aside.value.gotoMenu(homeRouter.value)
        }
        routerStore.deleteOtherMenu(index, routerStore.getFixedMenus(sysStore.getCurrentSystem.perms).indexOf(info.path) > -1)
      }
    },
    {
      label: '关闭全部标签页',
      operate: () => {
        if (routerStore.getFixedMenus(sysStore.getCurrentSystem.perms).indexOf(route.path) === -1) {
          aside.value && aside.value.gotoMenu(homeRouter.value)
        }
        routerStore.deleteAllMenu()
      }
    }
  ]
]

const sysConfigStore = useSysConfigStore();
</script>

<template>
  <PublicIndex>
    <el-container style="height: calc(100% - 50px)">
      <el-aside class="aside" :width="sysConfigStore.getMenuCollapse() ? '64px' : '200px'">
        <Aside ref="aside"/>
      </el-aside>
      <el-main class="content">
        <div class="header">
          <el-scrollbar always>
            <div class="header2">
              <RightClickMenu
                  v-for="(item,index) in routerStore.getMenuList()"
                  :key="item.name"
                  :menus="contextMenu(item,index)"
              >
                <el-tag
                    type="info"
                    :effect="item.path===route.path?'light':'plain'"
                    :closable="routerStore.getFixedMenus(sysStore.getCurrentSystem.perms).indexOf(item.path)===-1"
                    @click="gotoMenu(item.path)"
                    @close="deleteMenu(index)"
                    style="cursor: pointer;"
                >
                  {{ item.meta ? item.meta.label : item.name }}
                </el-tag>
              </RightClickMenu>
            </div>
          </el-scrollbar>
        </div>
        <div class="main">
          <router-view #default="{Component}">
            <keep-alive :include="routerStore.getMenuListNames">
              <component :is="Component" :key="route.path"/>
            </keep-alive>
          </router-view>
        </div>
      </el-main>
    </el-container>
  </PublicIndex>
</template>

<style scoped>
.aside {
  transition: width .3s;
}

.content {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  overflow: auto;
  padding: 0;

  .header {
    border-bottom: 1px solid #eee;
  }

  .header2 {
    display: flex;
    align-items: center;
    gap: 4px;
    flex: none;
    padding: 8px 0;
    height: 30px;

    > * {
      &:first-child {
        padding-left: 8px;
      }

      &:last-child {
        padding-right: 8px;
      }
    }
  }

  > .main {
    position: relative;
    padding: 8px;
    flex: auto;
    overflow: auto;
    background-color: var(--theme-color-main-bg);;
  }
}
</style>