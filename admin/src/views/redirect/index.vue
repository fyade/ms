<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { getSystems } from "@/api/common/sys.ts";
import { ElLoading } from "element-plus";
import { LoadingInstance } from "element-plus/es/components/loading/src/loading";
import { goToSystem } from "@/views/home/homeUtilFunc.ts";
import { splitUrlByX } from "@/utils/RegularUtils.ts";
import { onBeforeUnmount, ref } from "vue";
import Header from "@/layout/sys/header.vue";

let loading: LoadingInstance | null
onBeforeUnmount(() => {
  loading?.close()
})

const msg = ref('')
const route = useRoute()
const router = useRouter()
const init = () => {
  msg.value = 'Loading...'
  const pushPath = route.path;
  const allPaths = splitUrlByX(pushPath);
  if (allPaths.length === 0) {
    router.push('/')
    return
  }
  loading = ElLoading.service({
    lock: true,
    text: '系统资源加载中，请稍候。。。',
    background: 'rgba(0, 0, 0, .7)',
  });
  getSystems().then(async res => {
    const find = res.find(item => `/${item.path}` === allPaths[0]);
    if (!find) {
      await router.push('/')
    } else {
      await goToSystem(find, {
        pushPath: allPaths.reduce((a, b) => `${a}${b}`),
        errorCallback: () => {
          router.push('/')
        },
      });
    }
  }).catch(() => {
    msg.value = 'Error...'
    loading?.close()
  })
}
init()
</script>

<template>
  <Header style="height: 60px;background-color: #fff;" :if-show-breadcrumb="false"/>
  {{ msg }}
</template>

<style scoped>
</style>
