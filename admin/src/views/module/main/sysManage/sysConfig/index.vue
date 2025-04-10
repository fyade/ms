<script lang="ts">
export default {
  name: 'main:sysManage:sysConfig'
}
</script>

<script setup lang="ts">
import { ref } from "vue";
import { SysConfigDto } from "@/type/module/main/sysManage/sysConfig.ts";
import { sysConfigApi } from "@/api/module/main/sysManage/sysConfig.ts";
import { sysConfigDict } from "@/dict/module/main/sysManage/sysConfig.ts";
import { final } from "@/utils/base.ts";
import { objectUtils } from "@ms/common";
import { ElMessage } from "element-plus";

const form = ref<SysConfigDto>(new SysConfigDto())
const loading = ref(false)
const loading2 = ref(false)
const ifHasConfig = ref(false)
const getData = () => {
  if (loading.value) {
    return;
  }
  loading.value = true
  sysConfigApi.selectAll({}).then(res => {
    ifHasConfig.value = res.length > 0
    if (res.length > 0) {
      objectUtils.copyObject(form.value, res[0])
    }
  }).finally(() => {
    loading.value = false
    loading2.value = false
  })
}
getData()

const saveForm = () => {
  if (loading2.value) {
    return;
  }
  loading2.value = true
  if (ifHasConfig.value) {
    sysConfigApi.updateOne(form.value).then(() => {
      ElMessage.success('操作成功')
    }).finally(getData)
  } else {
    sysConfigApi.insertOne(form.value).then(() => {
      ElMessage.success('操作成功')
    }).finally(getData)
  }
}
</script>

<template>
  <div class="zs-table-data">
    <el-form
        label-width="auto"
        :form="form"
        v-loading="loading || loading2"
    >
      <el-form-item :label="sysConfigDict.ifAllowUserRegist">
        <el-radio-group v-model="form.ifAllowUserRegist">
          <el-radio :value="final.Y">是</el-radio>
          <el-radio :value="final.N">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveForm">保存配置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
</style>
