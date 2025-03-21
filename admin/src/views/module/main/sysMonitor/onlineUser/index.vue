<script lang="ts">
export default {
  name: 'main:sysMonitor:onlineUser'
}
</script>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { CONFIG, final } from "@/utils/base.ts";
import Pagination from "@/components/pagination/pagination.vue";
import { funcTablePage } from "@/composition/tablePage/tablePage2.ts";
import { State2, TablePageConfig } from "@/type/tablePage.ts";
import { FormRules } from "element-plus";
import { Delete, Download, Edit, Plus, Refresh, Upload, Search } from "@element-plus/icons-vue";
import { OnlineUserDto, OnlineUserUpdDto } from "@/type/module/main/sysMonitor/onlineUser.ts";
import { onlineUserApi } from "@/api/module/main/sysMonitor/onlineUser.ts";
import { onlineUserDict } from "@/dict/module/main/sysMonitor/onlineUser.ts";
import { timeUtils } from "@ms/common";

const state = reactive<State2<OnlineUserDto, OnlineUserUpdDto>>({
  dialogForm: new OnlineUserUpdDto(),
  dialogForms: [],
  dialogForms_error: {},
  filterForm: {
    userid: '',
    username: '',
    loginRole: '',
  },
})
const dFormRules: FormRules = {}
const config = new TablePageConfig({
})

const {
  dialogFormRef,
  dialogFormsRef,
  filterFormRef,
  filterFormVisible1,
  filterFormVisible,
  dialogVisible,
  dialogLoadingRef,
  dialogButtonLoadingRef,
  tableLoadingRef,
  switchLoadingRef,
  activeTabName,
  tableData,
  pageParam,
  total,
  multipleSelection,
  dialogType,
  refresh,
  dCan,
  dCon,
  fEnter,
  fCon,
  fCan,
  gRefresh,
  gIns,
  gUpd,
  gDel,
  gExport,
  gImport,
  gChangeFilterFormVisible,
  tUpd,
  tDel,
  handleSelectionChange,
  pageChange,
  dfIns,
  dfDel,
  ifRequired,
} = funcTablePage<OnlineUserDto, OnlineUserUpdDto>({
  state,
  dFormRules,
  config,
  api: onlineUserApi,
  dict: onlineUserDict,
})
</script>

<template>
  <!--顶部筛选表单-->
  <div class="zs-filter-form" v-show="filterFormVisible1 && filterFormVisible">
    <el-form
        class="demo-form-inline"
        ref="filterFormRef"
        :model="state.filterForm"
        :inline="true"
        @keyup.enter="fEnter"
    >
      <!--在此下方添加表单项-->
      <el-form-item :label="onlineUserDict.userid" prop="userid">
        <el-input v-model="state.filterForm.userid" :placeholder="onlineUserDict.userid"/>
      </el-form-item>
      <el-form-item :label="onlineUserDict.username" prop="username">
        <el-input v-model="state.filterForm.username" :placeholder="onlineUserDict.username"/>
      </el-form-item>
      <el-form-item :label="onlineUserDict.loginRole" prop="loginRole">
        <el-input v-model="state.filterForm.loginRole" :placeholder="onlineUserDict.loginRole"/>
      </el-form-item>
      <!--在此上方添加表单项-->
      <el-form-item>
        <el-button type="primary" @click="fCon">筛选</el-button>
        <el-button @click="fCan">重置</el-button>
      </el-form-item>
    </el-form>
  </div>

  <!--操作按钮-->
  <div class="zs-button-row">
    <div>
      <el-button type="primary" plain :icon="Refresh" @click="gRefresh">刷新</el-button>
      <!--<el-button type="primary" plain :icon="Plus" @click="gIns">新增</el-button>-->
      <!--<el-button type="success" plain :icon="Edit" :disabled="config.bulkOperation?multipleSelection.length===0:multipleSelection.length!==1" @click="gUpd">修改</el-button>-->
      <!--<el-button type="danger" plain :icon="Delete" :disabled="multipleSelection.length===0" @click="gDel()">删除</el-button>-->
      <!--<el-button type="warning" plain :icon="Download" :disabled="multipleSelection.length===0" @click="gExport()">导出</el-button>-->
      <!--<el-button type="warning" plain :icon="Upload" @click="gImport">上传</el-button>-->
    </div>
    <div>
      <el-button v-if="filterFormVisible1" plain :icon="Search" circle @click="gChangeFilterFormVisible"/>
    </div>
  </div>

  <div class="zs-table-data">
    <!--数据表格-->
    <el-table
        v-loading="tableLoadingRef"
        :data="tableData"
        @selection-change="handleSelectionChange"
    >
      <el-table-column fixed type="selection" width="55"/>
      <!--<el-table-column fixed prop="id" :label="onlineUserDict.id" width="180"/>-->
      <!--上面id列的宽度改一下-->
      <!--在此下方添加表格列-->
      <el-table-column prop="userid" :label="onlineUserDict.userid" width="120"/>
      <el-table-column prop="username" :label="onlineUserDict.username" width="120"/>
      <el-table-column prop="loginRole" :label="onlineUserDict.loginRole" width="120"/>
      <el-table-column prop="loginTime" :label="onlineUserDict.loginTime" width="240">
        <template #default="{row}">
          {{ timeUtils.formatDate(new Date(row.loginTime)) }}
        </template>
      </el-table-column>
      <el-table-column prop="loginIp" :label="onlineUserDict.loginIp" width="240"/>
      <el-table-column prop="loginOs" :label="onlineUserDict.loginOs" width="120"/>
      <el-table-column prop="loginBrowser" :label="onlineUserDict.loginBrowser" width="150"/>
      <!--<el-table-column prop="remark" :label="onlineUserDict.remark" width="120"/>-->
      <!--在此上方添加表格列-->
      <!--<el-table-column prop="createRole" :label="onlineUserDict.createRole" width="120"/>-->
      <!--<el-table-column prop="updateRole" :label="onlineUserDict.updateRole" width="120"/>-->
      <!--<el-table-column prop="createBy" :label="onlineUserDict.createBy" width="120"/>-->
      <!--<el-table-column prop="updateBy" :label="onlineUserDict.updateBy" width="120"/>-->
      <!--<el-table-column prop="createTime" :label="onlineUserDict.createTime" width="220"/>-->
      <!--<el-table-column prop="updateTime" :label="onlineUserDict.updateTime" width="220"/>-->
      <!--<el-table-column prop="deleted" :label="onlineUserDict.deleted" width="60"/>-->
      <!--上方几个酌情使用-->
      <el-table-column fixed="right" label="操作" min-width="140">
        <template #default="{row}">
          <div class="zs-table-data-operate-button-row">
            <!--<el-button link type="primary" size="small" :icon="Edit" @click="tUpd(row.id)">修改</el-button>-->
            <!--<el-button link type="danger" size="small" :icon="Delete" @click="tDel(row.id)">删除</el-button>-->
            <el-button link type="danger" size="small" :icon="Delete" @click="tDel(row.id)">强退</el-button>
          </div>
        </template>
      </el-table-column>
      <template #append>
        <div class="el-table-append-box">
          <span>此表格的多选<span class="underline">不支持</span>{{ `跨分页保存，当前已选 ${multipleSelection.length} 条数据。` }}</span>
        </div>
      </template>
    </el-table>

    <!--分页-->
    <Pagination
        v-if="config.pageQuery"
        :total="total"
        :page-num="pageParam.pageNum"
        :page-size="pageParam.pageSize"
        @page-change="pageChange"
    />
  </div>
</template>

<style scoped>
</style>
