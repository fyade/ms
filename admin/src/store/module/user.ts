import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { ElNotification, NotificationHandle, ElMessage } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import { LoginDto, UserDto } from "@/type/module/main/sysManage/user.ts";
import { getSelfInfo } from "@/api/module/main/sysManage/user.ts";
import { ifWebsiteLink } from "@/utils/LinkUtils.ts";
import { UserVisitorDto } from "@/type/module/main/otherUser/userVisitor.ts";
import { objectUtils } from "@ms/common";
import { BCService } from "@/services/broadcastChannel.ts";
import { loginApi, logOutApi } from "@/api/module/main/sysManage/userLogin.ts";

export const useUserStore = defineStore('userStore', () => {
  const router = useRouter()
  const token = ref('')
  const loginRole = ref('')
  const userinfo = reactive<UserDto | UserVisitorDto>({
    id: '',
    username: '',
    nickname: '',
    password: '',
    avatar: '',
    sex: '',
    email: '',
    tel: '',
  })
  const ifLogin = ref(false)
  const route = useRoute()
  const login = async (user: LoginDto) => {
    return new Promise((resolve, reject) => {
      loginApi(user).then(async res => {
        // 其他标签页如果有不同用户，则将其登出
        BCService.emit('login', { username: user.username, loginRole: user.loginRole })
        if (res) {
          const notification: NotificationHandle = ElNotification({
            title: '提示',
            message: '登录成功，系统资源加载中。。。',
            type: 'success',
            showClose: false,
            duration: 0,
          });
          try {
            token.value = res.token
            loginRole.value = res.loginRole
            ifLogin.value = true
            objectUtils.copyObject(userinfo, res.user)
            if (route.query?.redirect && !ifWebsiteLink(route.query?.redirect.toString(), '/')) {
              notification.close()
              await router.push(route.query.redirect as string)
            } else {
              notification.close()
              await router.push('/')
            }
          } catch (e) {
            console.error(e);
            ElMessage.error({
              message: '系统发生故障，请检查菜单是否有错误，若无法解决，请查看开发文档或联系开发者。',
              duration: 0,
              showClose: true
            })
            notification.close()
            reject()
          }
        }
        resolve(null)
      }).catch((e) => {
        console.error(e)
        reject(e)
      })
    })
  }
  const logOut = () => {
    logOutApi()
    setTimeout(() => {
      removeToken()
      location.reload()
    })
  }
  const removeToken = () => {
    token.value = ''
    ifLogin.value = false
    objectUtils.clearObject(userinfo)
  }
  const refreshSelfInfo = () => {
    getSelfInfo().then(res => {
      objectUtils.copyObject(userinfo, res)
    })
  }
  return {
    token,
    loginRole,
    userinfo,
    ifLogin,
    login,
    removeToken,
    logOut,
    refreshSelfInfo
  }
}, {
  persist: true,
})
