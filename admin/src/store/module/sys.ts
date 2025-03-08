import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { getSysVersion } from "@/api/common/sys.ts";
import { SysDto } from "@/type/module/main/sysManage/sys.ts";
import { useUserStore } from "@/store/module/user.ts";
import { adminConfig } from '@ms/config'
import { objectUtils } from "@ms/common";

export const useSysStore = defineStore('sysStore', () => {
  const version = reactive({
    hd: '-.-.--.-',
    qd: adminConfig.currentVersion
  })
  getSysVersion().then(res => {
    version.hd = res
  })

  const currentSystem = reactive<SysDto>(new SysDto())
  const setCurrentSystem = (dto: SysDto) => {
    objectUtils.copyObject(currentSystem, dto)
  }
  const getCurrentSystem = computed(() => {
    return currentSystem
  })

  const publicHeader = (): Record<string, string> => ({
    'authorization': `Bearer ${useUserStore().token}`
  })

  const urlAddAuth = (url: string) => {
    const header = publicHeader();
    return `${url}?` + Object.keys(header).map(key => `${key}=${header[key]}`).join('&')
  }

  const visibleButtons = ref(new Map<string, string[]>())
  const setVisibleButtons = (sysPerm: string, buttonPerms: string[]) => {
    visibleButtons.value.set(sysPerm, buttonPerms)
  }
  const getVisibleButton = (sysPerm: string, buttonPerm: string) => {
    const newVar = visibleButtons.value.get(sysPerm);
    if (newVar && newVar.includes(buttonPerm)) {
      return true
    }
    return false
  }

  return {
    version,
    setCurrentSystem,
    getCurrentSystem,
    publicHeader,
    urlAddAuth,
    setVisibleButtons,
    getVisibleButton,
  }
})
