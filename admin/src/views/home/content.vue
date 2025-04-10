<script setup lang="ts">
import { useSysStore } from "@/store/module/sys.ts";
import { onBeforeUnmount, reactive, ref } from "vue";
import { getSysInfo, getSysTime } from "@/api/common/sys.ts";
import { numberUtils, timeUtils } from "@ms/common";

const sysStore = useSysStore()
let timer_systime: NodeJS.Timeout | null = null;
let timer_systime2: NodeJS.Timeout | null = null;
let timer_systime3: NodeJS.Timeout | null = null;
const intervalTimers: NodeJS.Timeout[] = []
onBeforeUnmount(() => {
  intervalTimers.forEach(timer => clearInterval(timer))
  if (timer_systime) clearInterval(timer_systime);
  if (timer_systime2) clearTimeout(timer_systime2);
  if (timer_systime3) clearTimeout(timer_systime3);
})

// 服务器监控
class CpuInfo {
}

class MemoryInfo {
  total!: number
  free!: number
  used!: number
}

class DiskInfo {
  mount!: string
  size!: number
  used!: number
  available!: number
}

const serverinfo = reactive<{
  cpu: CpuInfo | null
  memory: MemoryInfo | null
  disk: DiskInfo[]
}>({
  cpu: null,
  memory: null,
  disk: []
})
const serverMonitor = () => {
  const _ = () => {
    getSysInfo().then(res => {
      serverinfo.cpu = res.cpu;
      serverinfo.memory = res.memory;
      serverinfo.disk = res.disk;
    })
  }
  _()
  const interval = setInterval(_, 3000);
  intervalTimers.push(interval)
}
serverMonitor()

// const tips = [
// ]

const currentSysTime = ref('')
const timeAdd = () => {
  currentSysTime.value = timeUtils.formatDate(new Date(new Date(currentSysTime.value).getTime() + 1000))
}
const refreshSysTime = () => {
  if (timer_systime) {
    clearInterval(timer_systime);
  }
  getSysTime().then(res => {
    currentSysTime.value = timeUtils.formatDate(new Date(res))
    if (timer_systime2) clearTimeout(timer_systime2);
    timer_systime2 = setTimeout(() => {
      timeAdd()
      timer_systime = setInterval(timeAdd, 1000)
    }, 1000 - new Date(res).getMilliseconds())
  }).finally(() => {
    if (timer_systime3) clearTimeout(timer_systime3);
    timer_systime3 = setTimeout(refreshSysTime, 10000)
  })
}
refreshSysTime()
</script>

<template>
  <div class="box">
    <div>
      <el-divider content-position="left">服务器监控（仅供参考）{{ currentSysTime }}</el-divider>
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <el-row :gutter="20">
          <el-col :span="24">
            <!--硬盘-->
            <el-card
                v-if="serverinfo.disk&&serverinfo.disk.length>0"
                shadow="never"
                :body-style="{display: 'flex',flexDirection: 'column',gap: '8px'}"
            >
              <div v-for="(item,index) in serverinfo.disk" :key="index">
                <div
                    style="height: 15px;border: 1px solid #bcbcbc;"
                    :style="{
                      backgroundImage: `linear-gradient(to right, ${(item.used / item.size) * 100 > 90.5 ? '#da2626' : '#26a0da'} ${(item.used / item.size) * 100}%, #e6e6e6 ${(item.used / item.size) * 100}%)`
                    }"
                >
                </div>
                <p style="color: #6d6d6d;font-size: 14px;">
                    <span
                        :title="item.mount"
                        style="display: inline-block; width: 5em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;vertical-align: text-bottom;"
                    >
                      {{ item.mount }}
                    </span>
                  <span>{{ numberUtils.unitConversion_storage(item.size - item.used, { unitSpace: ' ' }) }} 可用</span>
                  <span>，共 {{ numberUtils.unitConversion_storage(item.size, { unitSpace: ' ' }) }}</span>
                </p>
              </div>
            </el-card>
            <el-card v-else shadow="never">
              硬盘
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <!--CPU-->
            <el-card v-if="serverinfo.cpu" shadow="never">
            </el-card>
            <el-card v-else shadow="never">
              CPU
            </el-card>
          </el-col>
          <el-col :span="12">
            <!--内存-->
            <el-card v-if="serverinfo.memory" shadow="never">
              <span>
                内存已使用 {{ numberUtils.unitConversion_storage(serverinfo.memory.used, { showNuit: false }) }}
              </span>
              <span> / {{ numberUtils.unitConversion_storage(serverinfo.memory.total, { unitSpace: ' ' }) }}</span>
              <span> ({{ ((serverinfo.memory.used / serverinfo.memory.total) * 100).toFixed(2) }}%)</span>
            </el-card>
            <el-card v-else shadow="never">
              内存
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>

    <!--<div>-->
    <!--  <el-divider content-position="left">注意事项</el-divider>-->
    <!--  <el-card shadow="never">-->
    <!--    <ul>-->
    <!--      <li v-for="(item, index) in tips" :key="index">{{ item }}</li>-->
    <!--    </ul>-->
    <!--  </el-card>-->
    <!--</div>-->
  </div>

  <div class="bottom-text">
    <div class="grey">
      <p>前端版本：{{ sysStore.version.qd }}</p>
      <p>后端版本：{{ sysStore.version.hd }}</p>
    </div>
  </div>
</template>

<style scoped>
.box {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: -20px auto 0;
  padding: 20px 0;
  max-width: 1200px;

  > * {
    padding: 20px;
    background-color: #fff;
  }
}

.bottom-text {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;

  .grey {
    color: gray;
  }

  > * {
    display: flex;
    gap: 24px;
  }
}
</style>
