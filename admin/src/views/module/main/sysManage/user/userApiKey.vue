<script setup lang="ts">
import { reactive } from "vue";
import { CONFIG, final } from "@/utils/base.ts";
import Pagination from "@/components/pagination/pagination.vue";
import { funcTablePage } from "@/composition/tablePage/tablePage2.ts";
import { State2, TablePageConfig } from "@/type/tablePage.ts";
import { ElMessage, FormRules } from "element-plus";
import { Delete, Download, Edit, Plus, Refresh, Upload, Search } from "@element-plus/icons-vue";
import { UserApiKeyDto, UserApiKeyUpdDto } from "@/type/module/main/sysManage/userApiKey.ts";
import { userApiKeyApi } from "@/api/module/main/sysManage/userApiKey.ts";
import { userApiKeyDict } from "@/dict/module/main/sysManage/userApiKey.ts";
import { UserDto2 } from "@/type/module/main/sysManage/user.ts";
import { userDict } from "@/dict/module/main/sysManage/user.ts";

const props = defineProps({
  user: {
    type: UserDto2,
    required: true
  }
})

const state = reactive<State2<UserApiKeyDto, UserApiKeyUpdDto>>({
  dialogForm: {
    id: -1,
    userId: props.user?.id,
    userRole: '#',
    apiKey: '#',
    remark: '',
  },
  dialogForms: [],
  dialogForms_error: {},
  filterForm: {},
})
const dFormRules: FormRules = {
  userId: [{required: true, trigger: 'change'}],
  userRole: [{required: true, trigger: 'change'}],
  apiKey: [{required: true, trigger: 'change'}],
}
const config = new TablePageConfig<UserApiKeyDto>({
  bulkOperation: true,
  selectParam: {
    userId: props.user?.id,
    userRole: 'admin',
  },
  insUpdParam: {
    userId: props.user?.id,
    userRole: 'admin',
  },
  dialogFormLoadingFinishCallback: () => {
    state.dialogForm.apiKey = '#'
    state.dialogForms?.forEach((item) => {
      item.apiKey = '#'
    })
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
} = funcTablePage<UserApiKeyDto, UserApiKeyUpdDto>({
  state,
  dFormRules,
  config,
  api: userApiKeyApi,
  dict: userApiKeyDict,
})

const copy = async (row: UserApiKeyDto) => {
  await navigator.clipboard.writeText(row.apiKey)
  ElMessage.success('复制成功。')
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
        <el-form-item v-if="dialogType.value!==final.ins" :label="userApiKeyDict.id" prop="id">
          <span>{{ state.dialogForm.id }}</span>
        </el-form-item>
        <!--在此下方添加表单项-->
        <!--<el-row>-->
        <!--  <el-col :span="12">-->
        <!--    <el-form-item :label="userApiKeyDict.userId" prop="userId">-->
        <!--      <el-input v-model="state.dialogForm.userId" :placeholder="userApiKeyDict.userId"/>-->
        <!--    </el-form-item>-->
        <!--  </el-col>-->
        <!--  <el-col :span="12">-->
        <!--    <el-form-item :label="userApiKeyDict.userRole" prop="userRole">-->
        <!--      <el-input v-model="state.dialogForm.userRole" :placeholder="userApiKeyDict.userRole"/>-->
        <!--    </el-form-item>-->
        <!--  </el-col>-->
        <!--</el-row>-->
        <el-row>
          <el-col :span="12">
            <el-form-item :label="userApiKeyDict.apiKey" prop="apiKey">
              <template #label>
                <Tooltip content="后端生成">
                  {{ userApiKeyDict.apiKey }}
                </Tooltip>
              </template>
              <el-input v-model="state.dialogForm.apiKey" :placeholder="userApiKeyDict.apiKey" disabled/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="userApiKeyDict.remark" prop="remark">
              <el-input type="textarea" v-model="state.dialogForm.remark" :placeholder="userApiKeyDict.remark"/>
            </el-form-item>
          </el-col>
        </el-row>
        <!--在此上方添加表单项-->
        <!--<el-form-item :label="userApiKeyDict.orderNum" prop='orderNum'>-->
        <!--  <el-input-number v-model="state.dialogForm.orderNum" controls-position="right"/>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="userApiKeyDict.ifDefault" prop='ifDefault'>-->
        <!--  <el-switch v-model="state.dialogForm.ifDefault" :active-value='final.Y' :inactive-value='final.N'/>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="userApiKeyDict.ifDisabled" prop='ifDisabled'>-->
        <!--  <el-radio-group v-model="state.dialogForm.ifDisabled">-->
        <!--    <el-radio :value="final.Y">是</el-radio>-->
        <!--    <el-radio :value="final.N">否</el-radio>-->
        <!--  </el-radio-group>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="userApiKeyDict.ifDisabled" prop="ifDisabled">-->
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
          <!--<el-table-column prop="userId" :label="userApiKeyDict.userId" width="300">-->
          <!--  <template #header>-->
          <!--    <span :class="ifRequired('userId')?'tp-table-header-required':''">{{ userApiKeyDict.userId }}</span>-->
          <!--  </template>-->
          <!--  <template #default="{$index}">-->
          <!--    <div :class="state.dialogForms_error?.[`${$index}-userId`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">-->
          <!--      <el-input v-model="state.dialogForms[$index].userId" :placeholder="userApiKeyDict.userId"/>-->
          <!--    </div>-->
          <!--  </template>-->
          <!--</el-table-column>-->
          <!--<el-table-column prop="userRole" :label="userApiKeyDict.userRole" width="300">-->
          <!--  <template #header>-->
          <!--    <span :class="ifRequired('userRole')?'tp-table-header-required':''">{{ userApiKeyDict.userRole }}</span>-->
          <!--  </template>-->
          <!--  <template #default="{$index}">-->
          <!--    <div :class="state.dialogForms_error?.[`${$index}-userRole`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">-->
          <!--      <el-input v-model="state.dialogForms[$index].userRole" :placeholder="userApiKeyDict.userRole"/>-->
          <!--    </div>-->
          <!--  </template>-->
          <!--</el-table-column>-->
          <el-table-column prop="apiKey" :label="userApiKeyDict.apiKey" width="300">
            <template #header>
              <Tooltip content="后端生成">
                <span :class="ifRequired('apiKey')?'tp-table-header-required':''">{{ userApiKeyDict.apiKey }}</span>
              </Tooltip>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-apiKey`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index].apiKey" :placeholder="userApiKeyDict.apiKey" disabled/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="remark" :label="userApiKeyDict.remark" width="300">
            <template #header>
              <span :class="ifRequired('remark')?'tp-table-header-required':''">{{ userApiKeyDict.remark }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-remark`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input type="textarea" v-model="state.dialogForms[$index].remark" :placeholder="userApiKeyDict.remark"/>
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
      <!--<el-form-item :label="userApiKeyDict." prop="">-->
      <!--  <el-input v-model="state.filterForm." :placeholder="userApiKeyDict."/>-->
      <!--</el-form-item>-->
      <!--在此上方添加表单项-->
      <el-form-item>
        <el-button type="primary" @click="fCon">筛选</el-button>
        <el-button @click="fCan">重置</el-button>
      </el-form-item>
    </el-form>
  </div>

  <el-divider content-position="left">
    <el-text size="large" style="font-weight: bold;">用户信息</el-text>
  </el-divider>
  <el-form>
    <el-row>
      <el-col :span="8">
        <el-form-item :label="userDict.id">
          {{ props.user.id }}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="userDict.username">
          {{ props.user.username }}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="userDict.nickname">
          {{ props.user.nickname }}
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>

  <el-divider content-position="left">
    <el-text size="large" style="font-weight: bold;">apiKey列表</el-text>
  </el-divider>
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
      <!--<el-table-column fixed prop="id" :label="userApiKeyDict.id" width="180"/>-->
      <!--上面id列的宽度改一下-->
      <!--在此下方添加表格列-->
      <el-table-column prop="userId" :label="userApiKeyDict.userId" width="120"/>
      <el-table-column prop="userRole" :label="userApiKeyDict.userRole" width="120"/>
      <el-table-column prop="apiKey" :label="userApiKeyDict.apiKey" width="240">
        <template #default="{row}">
          <div class="zs-table-data-col-more-col">
            <span>******</span>
            <el-button link :icon="Edit" @click="copy(row)">复制</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="remark" :label="userApiKeyDict.remark" width="240"/>
      <!--在此上方添加表格列-->
      <!--<el-table-column prop="createRole" :label="userApiKeyDict.createRole" width="120"/>-->
      <!--<el-table-column prop="updateRole" :label="userApiKeyDict.updateRole" width="120"/>-->
      <!--<el-table-column prop="createBy" :label="userApiKeyDict.createBy" width="120"/>-->
      <!--<el-table-column prop="updateBy" :label="userApiKeyDict.updateBy" width="120"/>-->
      <!--<el-table-column prop="createTime" :label="userApiKeyDict.createTime" width="220"/>-->
      <!--<el-table-column prop="updateTime" :label="userApiKeyDict.updateTime" width="220"/>-->
      <!--<el-table-column prop="deleted" :label="userApiKeyDict.deleted" width="60"/>-->
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
