import { defineStore } from "pinia";
import { ref } from "vue";

export const useSysConfigStore = defineStore('sysConfigStore', () => {
  const menuCollapse = ref(false)
  const getMenuCollapse = () => {
    return menuCollapse.value
  }
  const setMenuCollapse = (b: boolean) => {
    menuCollapse.value = b
  }
  return {
    // 请勿使用 menuCollapse，由于需要持久化的值必须要写在 return 里面，所以才会在这里 return 出去
    menuCollapse,
    getMenuCollapse,
    setMenuCollapse,
  }
}, {
  persist: true,
})
