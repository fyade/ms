<script lang="ts">
export default {
  name: 'main:sysLog:logScheduledTask'
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
import { LogScheduledTaskDto, LogScheduledTaskUpdDto } from "@/type/module/main/sysLog/logScheduledTask.ts";
import { logScheduledTaskApi } from "@/api/module/main/sysLog/logScheduledTask.ts";
import { logScheduledTaskDict } from "@/dict/module/main/sysLog/logScheduledTask.ts";
import { timeUtils } from "@ms/common";

const state = reactive<State2<LogScheduledTaskDto, LogScheduledTaskUpdDto>>({
  dialogForm: {
    id: -1,
    taskTarget: '',
    operateType: '',
    ifSuccess: '',
    remark: '',
  },
  dialogForms: [],
  dialogForms_error: {},
  filterForm: {
    taskTarget: '',
    operateType: '',
    ifSuccess: '',
  },
})
const dFormRules: FormRules = {
  taskTarget: [{required: true, trigger: 'change'}],
  operateType: [{required: true, trigger: 'change'}],
  ifSuccess: [{required: true, trigger: 'change'}],
}
const config = new TablePageConfig({
  bulkOperation: true,
  selectParam: {
    createTime: {
      between: {
        type: 'date',
        value: [null, null]
      } as {
        type: string
        value: [null, null] | [Date, Date]
      }
    }
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
} = funcTablePage<LogScheduledTaskDto, LogScheduledTaskUpdDto>({
  state,
  dFormRules,
  config,
  api: logScheduledTaskApi,
  dict: logScheduledTaskDict,
})

const datePickerValue = ref('')
const shortcuts = [
  {
    text: '前一周',
    value: () => {
      const start = new Date()
      const end = new Date()
      start.setDate(start.getDate() - 7)
      return [start, end]
    },
  },
  {
    text: '前两周',
    value: () => {
      const start = new Date()
      const end = new Date()
      start.setDate(start.getDate() - 14)
      return [start, end]
    },
  },
  {
    text: '前一个月',
    value: () => {
      const start = new Date()
      const end = new Date()
      start.setMonth(start.getMonth() - 1)
      return [start, end]
    },
  },
  {
    text: '前三个月',
    value: () => {
      const start = new Date()
      const end = new Date()
      start.setMonth(start.getMonth() - 3)
      return [start, end]
    },
  },
  {
    text: '前半年',
    value: () => {
      const start = new Date()
      const end = new Date()
      start.setMonth(start.getMonth() - 6)
      return [start, end]
    },
  },
  {
    text: '前一年',
    value: () => {
      const start = new Date()
      const end = new Date()
      start.setFullYear(start.getFullYear() - 1)
      return [start, end]
    },
  },
]
const datePickerValueChange = (value: Date[]) => {
  if (value) {
    config!.selectParam!.createTime!.between!.value[0] = value[0]
    config!.selectParam!.createTime!.between!.value[1] = value[1]
  } else {
    config!.selectParam!.createTime!.between!.value[0] = null
    config!.selectParam!.createTime!.between!.value[1] = null
  }
}
const fCan2 = () => {
  datePickerValue.value = ''
  config!.selectParam!.createTime!.between!.value[0] = null
  config!.selectParam!.createTime!.between!.value[1] = null
  fCan()
}
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
        <el-form-item v-if="dialogType.value!==final.ins" :label="logScheduledTaskDict.id" prop="id">
          <span>{{ state.dialogForm.id }}</span>
        </el-form-item>
        <!--在此下方添加表单项-->
        <el-row>
          <el-col :span="12">
            <el-form-item :label="logScheduledTaskDict.taskTarget" prop="taskTarget">
              <el-input v-model="state.dialogForm.taskTarget" :placeholder="logScheduledTaskDict.taskTarget"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="logScheduledTaskDict.operateType" prop="operateType">
              <el-input v-model="state.dialogForm.operateType" :placeholder="logScheduledTaskDict.operateType"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="logScheduledTaskDict.ifSuccess" prop="ifSuccess">
              <el-radio-group v-model="state.dialogForm.ifSuccess">
                <el-radio :value="final.Y">是</el-radio>
                <el-radio :value="final.N">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="logScheduledTaskDict.remark" prop="remark">
              <el-input type="textarea" v-model="state.dialogForm.remark" :placeholder="logScheduledTaskDict.remark"/>
            </el-form-item>
          </el-col>
        </el-row>
        <!--在此上方添加表单项-->
        <!--<el-form-item :label="logScheduledTaskDict.orderNum" prop='orderNum'>-->
        <!--  <el-input-number v-model="state.dialogForm.orderNum" controls-position="right"/>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="logScheduledTaskDict.ifDefault" prop='ifDefault'>-->
        <!--  <el-switch v-model="state.dialogForm.ifDefault" :active-value='final.Y' :inactive-value='final.N'/>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="logScheduledTaskDict.ifDisabled" prop='ifDisabled'>-->
        <!--  <el-radio-group v-model="state.dialogForm.ifDisabled">-->
        <!--    <el-radio :value="final.Y">是</el-radio>-->
        <!--    <el-radio :value="final.N">否</el-radio>-->
        <!--  </el-radio-group>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="logScheduledTaskDict.ifDisabled" prop="ifDisabled">-->
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
          <el-table-column prop="taskTarget" :label="logScheduledTaskDict.taskTarget" width="300">
            <template #header>
              <span :class="ifRequired('taskTarget')?'tp-table-header-required':''">{{ logScheduledTaskDict.taskTarget }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-taskTarget`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index].taskTarget" :placeholder="logScheduledTaskDict.taskTarget"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="operateType" :label="logScheduledTaskDict.operateType" width="300">
            <template #header>
              <span :class="ifRequired('operateType')?'tp-table-header-required':''">{{ logScheduledTaskDict.operateType }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-operateType`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index].operateType" :placeholder="logScheduledTaskDict.operateType"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="ifSuccess" :label="logScheduledTaskDict.ifSuccess" width="70">
            <template #header>
              <span :class="ifRequired('ifSuccess')?'tp-table-header-required':''">{{ logScheduledTaskDict.ifSuccess }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-ifSuccess`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-checkbox v-model="state.dialogForms[$index].ifSuccess" :true-value="final.Y" :false-value="final.N"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="remark" :label="logScheduledTaskDict.remark" width="300">
            <template #header>
              <span :class="ifRequired('remark')?'tp-table-header-required':''">{{ logScheduledTaskDict.remark }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-remark`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input type="textarea" v-model="state.dialogForms[$index].remark" :placeholder="logScheduledTaskDict.remark"/>
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
      <el-form-item :label="logScheduledTaskDict.taskTarget" prop="taskTarget">
        <el-input v-model="state.filterForm.taskTarget" :placeholder="logScheduledTaskDict.taskTarget"/>
      </el-form-item>
      <el-form-item :label="logScheduledTaskDict.operateType" prop="operateType">
        <el-input v-model="state.filterForm.operateType" :placeholder="logScheduledTaskDict.operateType"/>
      </el-form-item>
      <el-form-item :label="logScheduledTaskDict.ifSuccess" prop="ifSuccess">
        <el-input v-model="state.filterForm.ifSuccess" :placeholder="logScheduledTaskDict.ifSuccess"/>
      </el-form-item>
      <el-form-item :label="logScheduledTaskDict.createTime" prop="createTime">
        <el-date-picker
            v-model="datePickerValue"
            type="datetimerange"
            :shortcuts="shortcuts"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
            @change="datePickerValueChange"
        />
      </el-form-item>
      <!--在此上方添加表单项-->
      <el-form-item>
        <el-button type="primary" @click="fCon">筛选</el-button>
        <el-button @click="fCan2">重置</el-button>
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
      <el-button type="warning" plain :icon="Download" :disabled="multipleSelection.length===0" @click="gExport()">导出</el-button>
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
      <!--<el-table-column fixed prop="id" :label="logScheduledTaskDict.id" width="180"/>-->
      <!--上面id列的宽度改一下-->
      <!--在此下方添加表格列-->
      <el-table-column prop="taskTarget" :label="logScheduledTaskDict.taskTarget" width="300"/>
      <el-table-column prop="operateType" :label="logScheduledTaskDict.operateType" width="180">
        <template #default="{row}">
          <el-tag v-if="row.operateType === 'by:self'" type="success">系统自动触发</el-tag>
          <el-tag v-else-if="row.operateType === 'user:trigger'" type="primary">用户手动触发</el-tag>
          <el-tag v-else type="info">{{ row.operateType }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="ifSuccess" :label="logScheduledTaskDict.ifSuccess" width="120">
        <template #default="{row}">
          <el-tag v-if="row.ifSuccess === final.Y" type="success">成功</el-tag>
          <el-tag v-else-if="row.ifSuccess === final.N" type="danger">失败</el-tag>
          <el-tag v-else type="info">不详</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="remark" :label="logScheduledTaskDict.remark" width="120"/>
      <!--在此上方添加表格列-->
      <!--<el-table-column prop="createRole" :label="logScheduledTaskDict.createRole" width="120"/>-->
      <!--<el-table-column prop="updateRole" :label="logScheduledTaskDict.updateRole" width="120"/>-->
      <!--<el-table-column prop="createBy" :label="logScheduledTaskDict.createBy" width="120"/>-->
      <!--<el-table-column prop="updateBy" :label="logScheduledTaskDict.updateBy" width="120"/>-->
      <el-table-column prop="createTime" :label="logScheduledTaskDict.createTime" width="220">
        <template #default="{row}">
          {{ timeUtils.formatDate(new Date(row.createTime)) }}
        </template>
      </el-table-column>
      <!--<el-table-column prop="updateTime" :label="logScheduledTaskDict.updateTime" width="220"/>-->
      <!--<el-table-column prop="deleted" :label="logScheduledTaskDict.deleted" width="60"/>-->
      <!--上方几个酌情使用-->
      <!--<el-table-column fixed="right" label="操作" min-width="140">-->
      <!--  <template #default="{row}">-->
      <!--    <div class="zs-table-data-operate-button-row">-->
      <!--      <el-button link type="primary" size="small" :icon="Edit" @click="tUpd(row.id)">修改</el-button>-->
      <!--      <el-button link type="danger" size="small" :icon="Delete" @click="tDel(row.id)">删除</el-button>-->
      <!--    </div>-->
      <!--  </template>-->
      <!--</el-table-column>-->
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
