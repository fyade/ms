<script setup lang="ts">
import { reactive } from "vue";
import { CONFIG, final, mTTypeDict, MTTypeEnum } from "@/utils/base.ts";
import Pagination from "@/components/pagination/pagination.vue";
import { funcTablePage } from "@/composition/tablePage/tablePage2.ts";
import { State2, TablePageConfig } from "@/type/tablePage.ts";
import { FormRules } from "element-plus";
import { Delete, Download, Edit, Plus, Refresh, Upload, Search } from "@element-plus/icons-vue";
import { MenuThrottleDto, MenuThrottleUpdDto } from "@/type/module/main/sysManage/menuThrottle.ts";
import { menuThrottleApi } from "@/api/module/main/sysManage/menuThrottle.ts";
import { menuThrottleDict } from "@/dict/module/main/sysManage/menuThrottle.ts";
import { MenuDto } from "@/type/module/main/sysManage/menu.ts";
import { menuDictInter } from "@/dict/module/main/sysManage/menu.ts";

const props = defineProps({
  menu: {
    type: MenuDto,
    required: true,
  }
})

const state = reactive<State2<MenuThrottleDto, MenuThrottleUpdDto>>({
  dialogForm: {
    id: -1,
    menuId: props.menu.id,
    ttl: 0,
    limit: 0,
    type: MTTypeEnum.T_IP,
    remark: '',
  },
  dialogForms: [],
  dialogForms_error: {},
  filterForm: {},
})
const dFormRules: FormRules = {
  menuId: [{required: true, trigger: 'change'}],
  ttl: [{required: true, trigger: 'change'}],
  limit: [{required: true, trigger: 'change'}],
  type: [{required: true, trigger: 'change'}],
}
const config = new TablePageConfig({
  bulkOperation: true,
  selectParam: {
    menuId: props.menu.id,
  }
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
} = funcTablePage<MenuThrottleDto, MenuThrottleUpdDto>({
  state,
  dFormRules,
  config,
  api: menuThrottleApi,
  dict: menuThrottleDict,
})
</script>

<template>
  <!--弹窗-->
  <el-dialog
      :width="activeTabName===final.more ? CONFIG.dialog_width_wider : CONFIG.dialog_width"
      v-model="dialogVisible"
      :title="dialogType.label"
      draggable
      append-to-body
  >
    <el-tabs v-if="config.bulkOperation" v-model="activeTabName">
      <el-tab-pane :disabled="dialogType.value===final.upd" label="操作单个" :name="final.one"></el-tab-pane>
      <el-tab-pane :disabled="dialogType.value===final.upd" label="操作多个" :name="final.more"></el-tab-pane>
    </el-tabs>
    <template v-if="activeTabName===final.one">
      <el-form
          ref="dialogFormRef"
          v-loading="dialogLoadingRef"
          :model="state.dialogForm"
          :label-width="CONFIG.dialog_form_label_width"
          :rules="dFormRules"
      >
        <!--<el-row>-->
        <!--  <el-col :span="12"></el-col>-->
        <!--  <el-col :span="12"></el-col>-->
        <!--</el-row>-->
        <el-form-item v-if="dialogType.value!==final.ins" :label="menuThrottleDict.id" prop="id">
          <span>{{ state.dialogForm.id }}</span>
        </el-form-item>
        <!--在此下方添加表单项-->
        <el-row>
          <el-col :span="12">
            <el-form-item :label="menuThrottleDict.ttl" prop="ttl">
              <el-input-number v-model="state.dialogForm.ttl" controls-position="right"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="menuThrottleDict.limit" prop="limit">
              <el-input-number v-model="state.dialogForm.limit" controls-position="right"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="menuThrottleDict.type" prop="type">
              <!--<el-input v-model="state.dialogForm.type" :placeholder="menuThrottleDict.type"/>-->
              <el-radio-group v-model="state.dialogForm.type">
                <el-radio :value="MTTypeEnum.T_IP">{{ mTTypeDict[MTTypeEnum.T_IP] }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="menuThrottleDict.remark" prop="remark">
              <el-input type="textarea" v-model="state.dialogForm.remark" :placeholder="menuThrottleDict.remark"/>
            </el-form-item>
          </el-col>
        </el-row>
        <!--在此上方添加表单项-->
        <!--<el-form-item :label="menuThrottleDict.orderNum" prop='orderNum'>-->
        <!--  <el-input-number v-model="state.dialogForm.orderNum" controls-position="right"/>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="menuThrottleDict.ifDefault" prop='ifDefault'>-->
        <!--  <el-switch v-model="state.dialogForm.ifDefault" :active-value='final.Y' :inactive-value='final.N'/>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="menuThrottleDict.ifDisabled" prop='ifDisabled'>-->
        <!--  <el-radio-group v-model="state.dialogForm.ifDisabled">-->
        <!--    <el-radio :value="final.Y">是</el-radio>-->
        <!--    <el-radio :value="final.N">否</el-radio>-->
        <!--  </el-radio-group>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="menuThrottleDict.ifDisabled" prop="ifDisabled">-->
        <!--  <el-switch v-model="state.dialogForm.ifDisabled" :active-value="final.N" :inactive-value="final.Y"/>-->
        <!--</el-form-item>-->
        <!--上方几个酌情使用-->
      </el-form>
    </template>
    <template v-if="activeTabName===final.more">
      <el-form
          ref="dialogFormsRef"
          v-loading="dialogLoadingRef"
      >
        <el-table
            :data="state.dialogForms"
            v-if="state.dialogForms"
        >
          <el-table-column type="index" width="50">
            <template #header>
              #
            </template>
          </el-table-column>
          <!--在此下方添加表格列-->
          <el-table-column prop="ttl" :label="menuThrottleDict.ttl" width="300">
            <template #header>
              <span :class="ifRequired('ttl')?'tp-table-header-required':''">{{ menuThrottleDict.ttl }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-ttl`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input-number v-model="state.dialogForms[$index].ttl" controls-position="right"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="limit" :label="menuThrottleDict.limit" width="300">
            <template #header>
              <span :class="ifRequired('limit')?'tp-table-header-required':''">{{ menuThrottleDict.limit }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-limit`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input-number v-model="state.dialogForms[$index].limit" controls-position="right"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="type" :label="menuThrottleDict.type" width="300">
            <template #header>
              <span :class="ifRequired('type')?'tp-table-header-required':''">{{ menuThrottleDict.type }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-type`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <!--<el-input v-model="state.dialogForms[$index].type" :placeholder="menuThrottleDict.type"/>-->
                <el-radio-group v-model="state.dialogForms[$index].type">
                  <el-radio :value="MTTypeEnum.T_IP">{{ mTTypeDict[MTTypeEnum.T_IP] }}</el-radio>
                </el-radio-group>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="remark" :label="menuThrottleDict.remark" width="300">
            <template #header>
              <span :class="ifRequired('remark')?'tp-table-header-required':''">{{ menuThrottleDict.remark }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-remark`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input type="textarea" v-model="state.dialogForms[$index].remark" :placeholder="menuThrottleDict.remark"/>
              </div>
            </template>
          </el-table-column>
          <!--在此上方添加表格列-->
          <el-table-column fixed="right" label="操作" min-width="120">
            <template v-if="dialogType.value===final.ins" #default="{$index}">
              <el-button link type="danger" size="small" :icon="Delete" @click="dfDel($index)">删除</el-button>
            </template>
          </el-table-column>
          <template v-if="dialogType.value===final.ins" #append>
            <el-button text type="primary" plain :icon="Plus" @click="dfIns">新增</el-button>
          </template>
        </el-table>
      </el-form>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button :disabled="dialogButtonLoadingRef" @click="dCan">取消</el-button>
        <el-button type="primary" :disabled="dialogButtonLoadingRef" @click="dCon">确认</el-button>
      </span>
    </template>
  </el-dialog>

  <el-divider content-position="left">
    <el-text size="large" style="font-weight: bold;">接口组信息</el-text>
  </el-divider>
  <el-form>
    <el-row>
      <el-col :span="8">
        <el-form-item :label="menuDictInter.label">
          {{ props.menu.label }}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="menuDictInter.perms">
          {{ props.menu.perms }}
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>

  <el-divider content-position="left">
    <el-text size="large" style="font-weight: bold;">请求限速列表</el-text>
  </el-divider>

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
      <!--<el-form-item :label="menuThrottleDict." prop="">-->
      <!--  <el-input v-model="state.filterForm." :placeholder="menuThrottleDict."/>-->
      <!--</el-form-item>-->
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
      <el-button type="primary" plain :icon="Plus" @click="gIns">新增</el-button>
      <el-button type="success" plain :icon="Edit" :disabled="config.bulkOperation?multipleSelection.length===0:multipleSelection.length!==1" @click="gUpd">修改</el-button>
      <el-button type="danger" plain :icon="Delete" :disabled="multipleSelection.length===0" @click="gDel()">删除</el-button>
      <el-button type="warning" plain :icon="Download" :disabled="multipleSelection.length===0" @click="gExport()">导出</el-button>
      <el-button type="warning" plain :icon="Upload" @click="gImport">上传</el-button>
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
      <!--<el-table-column fixed prop="id" :label="menuThrottleDict.id" width="180"/>-->
      <!--上面id列的宽度改一下-->
      <!--在此下方添加表格列-->
      <!--<el-table-column prop="menuId" :label="menuThrottleDict.menuId" width="120"/>-->
      <el-table-column prop="ttl" :label="menuThrottleDict.ttl" width="120"/>
      <el-table-column prop="limit" :label="menuThrottleDict.limit" width="120"/>
      <el-table-column prop="type" :label="menuThrottleDict.type" width="120"/>
      <el-table-column prop="remark" :label="menuThrottleDict.remark" width="120"/>
      <!--在此上方添加表格列-->
      <!--<el-table-column prop="createRole" :label="menuThrottleDict.createRole" width="120"/>-->
      <!--<el-table-column prop="updateRole" :label="menuThrottleDict.updateRole" width="120"/>-->
      <!--<el-table-column prop="createBy" :label="menuThrottleDict.createBy" width="120"/>-->
      <!--<el-table-column prop="updateBy" :label="menuThrottleDict.updateBy" width="120"/>-->
      <!--<el-table-column prop="createTime" :label="menuThrottleDict.createTime" width="220"/>-->
      <!--<el-table-column prop="updateTime" :label="menuThrottleDict.updateTime" width="220"/>-->
      <!--<el-table-column prop="deleted" :label="menuThrottleDict.deleted" width="60"/>-->
      <!--上方几个酌情使用-->
      <el-table-column fixed="right" label="操作" min-width="140">
        <template #default="{row}">
          <div class="zs-table-data-operate-button-row">
            <el-button link type="primary" size="small" :icon="Edit" @click="tUpd(row.id)">修改</el-button>
            <el-button link type="danger" size="small" :icon="Delete" @click="tDel(row.id)">删除</el-button>
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
