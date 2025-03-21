<script lang="ts">
export default {
  name: 'main:sysLog:viewRealTime',
}
</script>

<script setup lang="ts">
import { Refresh } from "@element-plus/icons-vue";
import { viewRealTimeApi } from "@/api/module/main/sysLog/viewRealTime.ts";
import { nextTick, reactive, ref, useTemplateRef } from "vue";
import { ViewRealTimeDirs, ViewRealTimeSelDirsDto } from "@/type/module/main/sysLog/viewRealTime.ts";
import { numberUtils } from "@ms/common";

const param = reactive<ViewRealTimeSelDirsDto>({
  parentDir: '/',
})
const loading = ref(false)
const allDirs = ref<string[]>([])
const tableData = ref<ViewRealTimeDirs[]>([])
const viewType = ref('directory')
const getData = () => {
  loading.value = true
  viewRealTimeApi.selDirs(param).then((res) => {
    tableData.value = res
  }).finally(() => {
    loading.value = false
  })
}
getData()
const selectFileName = ref('')
const fileContent = ref('')
const getFile = () => {
  loading.value = true
  viewRealTimeApi.selFile({ ...param, filename: selectFileName.value }).then((res) => {
    fileContent.value = res
    nextTick(() => {
    })
  }).finally(() => {
    loading.value = false
  })
}
const refresh = () => {
  if (viewType.value === 'directory') {
    getData()
  } else if (viewType.value === 'file') {
    getFile()
  }
}

const gotoDirectory = (data: ViewRealTimeDirs) => {
  viewType.value = data.type
  if (data.type === 'directory') {
    allDirs.value.push(data.filename);
    param.parentDir = '/' + allDirs.value.join('/')
    getData()
  } else if (data.type === 'file') {
    selectFileName.value = data.filename
    getFile()
  }
}
const gotoDirectory2 = (index: number) => {
  viewType.value = 'directory'
  allDirs.value.splice(index)
  param.parentDir = '/' + allDirs.value.join('/')
  getData()
}
</script>

<template>
  <div class="zs-button-row">
    <div class="left">
      <div class="dir" @click="gotoDirectory2(0)">日志根目录</div>
      <template v-for="(path, index) in allDirs" :key="index">
        <SvgIcon name="right" color="#000"/>
        <div class="dir" @click="gotoDirectory2(index+1)">{{ path }}</div>
      </template>
    </div>
    <div>
      <el-button :disabled="loading" :loading="loading" plain :icon="Refresh" circle @click="refresh"/>
    </div>
  </div>

  <div class="zs-table-data" v-loading="loading">
    <template v-if="viewType==='file'">
      <pre>{{ fileContent }}</pre>
    </template>
    <template v-if="viewType==='directory'">
      <div v-for="(item, index) in tableData" :key="index" @click="gotoDirectory(item)">
        <div class="left">
          <SvgIcon v-if="item.type==='directory'" name="seo-folder" color="#000"/>
          <SvgIcon v-else-if="item.type==='file'" name="file-cabinet" color="#000"/>
        </div>
        <div class="center">
          <p>{{ item.filename }}</p>
        </div>
        <div class="right">
          <SvgIcon v-if="item.type==='directory'" name="right" color="#000"/>
          <div v-else-if="item.type==='file'">
            {{ numberUtils.unitConversion_storage(item.filesize, { unitSpace: ' ' }) }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.zs-button-row .left {
  display: flex;
  align-items: center;

  > div {
    cursor: pointer;

    &.dir {
      padding: 0 4px;
      border-radius: 4px;

      &:hover {
        background-color: #f3f4f6;
      }
    }
  }
}

.zs-table-data {
  > div {
    margin: 0;
    display: flex;
    align-items: center;
    cursor: pointer;

    > .left, .right {
      width: 36px;
      height: 36px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    > .center {
      flex: 1;
    }

    > .right {
      width: auto;
    }

    &:hover {
      background-color: #f3f4f6;
    }
  }
}

pre {
  overflow: auto;
  line-height: 1.6;
}
</style>
