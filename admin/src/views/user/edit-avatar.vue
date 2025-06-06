<script setup lang="ts">
import ImageCrop from "@/components/imageCrop/imageCrop.vue";
import { updUser } from "@/api/module/main/sysManage/user.ts";
import { useUserStore } from "@/store/module/user.ts";
import { ElMessage } from 'element-plus'
import { MultiAuthUserDto } from "@/type/module/main/sysManage/user.ts";

const userStore = useUserStore();

const uploadSuccess = (fileName: string) => {
  const multiAuthUser: { [P in keyof MultiAuthUserDto]: Partial<MultiAuthUserDto[P]> } = new MultiAuthUserDto();
  if (userStore.loginRole === "admin") {
    multiAuthUser.admin = {
      id: userStore.userinfo.admin!.id,
      avatar: fileName,
    }
  }
  if (userStore.loginRole === "visitor") {
    multiAuthUser.visitor = {
      id: userStore.userinfo.visitor!.id,
      avatar: fileName,
    }
  }
  updUser(multiAuthUser).then(res => {
    if (res) {
      ElMessage.success('头像上传成功。')
      userStore.refreshSelfInfo()
    } else {
      ElMessage.error('头像上传失败。')
    }
  })
}
</script>

<template>
  <ImageCrop @upload-success="uploadSuccess"/>
</template>

<style scoped>

</style>