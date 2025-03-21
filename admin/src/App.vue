<script setup lang="ts">
import { CONFIG } from "@/utils/base.ts";
import { BCService } from "@/services/broadcastChannel.ts";
import { useUserStore } from "@/store/module/user.ts";
import { ElMessageBox } from 'element-plus'

const userStore = useUserStore()

BCService.on('login', (data) => {
  if (userStore.ifLogin && (data.username !== userStore.userinfo.username || data.loginRole !== userStore.loginRole)) {
    ElMessageBox.alert(
        '在其他标签页有其他用户登录，当前标签页用户即将退出。',
        '警告',
    ).finally(() => {
      userStore.logOut()
    })
  }
})
</script>

<template>
  <div
      class="el"
      :style="{
        '--theme-color-menu-bg-active': `${CONFIG.theme_color_menu_bg_active}`,
        '--theme-color-menu-bg-active-lighten': `${CONFIG.theme_color_menu_bg_active_lighten}`,
        '--theme-color-menu-color': `${CONFIG.theme_color_menu_color}`,
        '--theme-color-main-bg': `${CONFIG.theme_color_main_bg}`,
      }"
  >
    <router-view/>
  </div>
</template>

<style scoped>
.el {
  width: 100%;
  height: 100%;
}
</style>
