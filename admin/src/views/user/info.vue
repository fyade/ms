<script setup lang="ts">
import { getSelfInfo, updUser } from '@/api/module/main/sysManage/user';
import { reactive } from 'vue';
import { ElMessage } from "element-plus";
import { useUserStore } from "@/store/module/user.ts";
import { MultiAuthUserDto } from "@/type/module/main/sysManage/user.ts";

const userStore = useUserStore();

const state = reactive({
  id: '',
  nickname: '',
  username: '',
})
const getUserInfo = () => {
  getSelfInfo().then(res => {
    if (userStore.loginRole === 'admin') {
      state.id = res.admin!.id
      state.nickname = res.admin!.nickname
      state.username = res.admin!.username
    }
    if (userStore.loginRole === 'visitor') {
      state.id = res.visitor!.id
      state.nickname = res.visitor!.nickname
      state.username = res.visitor!.username
    }
  })
}
getUserInfo()

const onSubmit = () => {
  const multiAuthUser: { [P in keyof MultiAuthUserDto]: Partial<MultiAuthUserDto[P]> } = new MultiAuthUserDto();
  if (userStore.loginRole === "admin") {
    multiAuthUser.admin = {
      id: userStore.userinfo.admin!.id,
      nickname: state.nickname,
      username: state.username,
    }
  }
  if (userStore.loginRole === "visitor") {
    multiAuthUser.visitor = {
      id: userStore.userinfo.visitor!.id,
      nickname: state.nickname,
      username: state.username,
    }
  }
  updUser(multiAuthUser).then(res => {
    if (res) {
      ElMessage.success('用户资料修改成功。')
      getUserInfo()
      userStore.refreshSelfInfo()
    }
  })
}
</script>

<template>
  <div>
    <el-form :model="state" label-width="auto" style="max-width: 500px;">
      <el-form-item label="昵称">
        <el-input v-model="state.nickname"/>
      </el-form-item>
      <el-form-item label="用户名">
        {{ state.username }}
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped></style>