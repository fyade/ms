<script setup lang="ts">
import { CONFIG, PAGINATION, publicDict } from "@/utils/base.ts";
import { fileBaseUrl } from "@/api/request.ts";
import { Delete, Plus, Refresh } from "@element-plus/icons-vue";
import Pagination from "@/components/pagination/pagination.vue";
import { computed, reactive, ref, useTemplateRef } from "vue";
import { ElMessageBox, ElMessage, FormInstance } from "element-plus";
import { userDeptApi, userDeptUpdDU } from "@/api/module/main/sysManage/userDept.ts";
import { userApi } from "@/api/module/main/sysManage/user.ts";
import { UserDeptDto } from "@/type/module/main/sysManage/userDept.ts";
import { PageDto } from "@/type/tablePage.ts";
import { UserDto } from "@/type/module/main/sysManage/user.ts";
import { DeptDto } from "@/type/module/main/sysManage/dept.ts";
import { userDict } from "@/dict/module/main/sysManage/user.ts";
import { deptDict } from "@/dict/module/main/sysManage/dept.ts";
import { useSysStore } from "@/store/module/sys.ts";
import { userDeptDict } from "@/dict/module/main/sysManage/userDept.ts";

const sysStore = useSysStore()

const props = defineProps({
  selectDept: {
    type: DeptDto,
    required: true
  }
})

const state = reactive({
  dialogForm: {
    id: '',
    username: '',
    nickname: ''
  },
  total1: -1,
  pageParam1: {
    userId: '',
    pageNum: PAGINATION.pageNum,
    pageSize: PAGINATION.pageSize
  },
  total2: -1,
  pageParam2: {
    pageNum: PAGINATION.pageNum,
    pageSize: PAGINATION.pageSize
  }
})
// 所有用户
const allUsers = ref<UserDto[]>([])
// 筛选表单
const filterFormRef = useTemplateRef<FormInstance>('filterFormRef')
const filterForm2Ref = useTemplateRef<FormInstance>('filterForm2Ref')
const table1LoadingRef = ref(false)
// 此部门的用户
const usersOfThisDept = ref<UserDto[]>([])
// 此部门的用户部门对
const userDeptsOfThisDept = ref<UserDeptDto[]>([])
// 分页查询当前部分用户
const getInfo = () => {
  usersOfThisDept.value = []
  userDeptsOfThisDept.value = []
  table1LoadingRef.value = true
  userDeptApi.selectList({deptId: props.selectDept.id, loginRole: 'admin', ...state.pageParam1}).then(res => {
    state.total1 = res.total
    userDeptsOfThisDept.value = res.list
    userApi.selectByIds(userDeptsOfThisDept.value.map(item => item.userId)).then(res => {
      usersOfThisDept.value = res
      table1LoadingRef.value = false
    })
  })
}
const clearFFormGetInfo = () => {
  filterForm2Ref.value?.resetFields()
  getInfo()
}
getInfo()
// 分页查询
const pageChange1 = (newVal: PageDto) => {
  state.pageParam1.pageNum = newVal.pageNum
  state.pageParam1.pageSize = newVal.pageSize
  getInfo()
}
// 选中行
const selectRows1 = ref<UserDto[]>([])
// 修改选中行
const handleSelectionChange1 = (val: UserDto[]) => {
  selectRows1.value = val
}

// 打开新增用户弹窗
const addUser = () => {
  addUserDialog.value = true
  selectRows2.value = []
}
// 移除用户
const delUser = () => {
  const selectUserIds = selectRows1.value.map(item => item.id);
  const ids = userDeptsOfThisDept.value.filter(item => selectUserIds.indexOf(item.userId) > -1).map(item => item.id)
  ElMessageBox.confirm(
      `此操作将删除选中的 ${ids.length} 条数据，且无法撤销，请确认是否继续？`,
      '警告',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
        draggable: true
      }
  ).then(() => {
    userDeptApi.deleteList(...ids).then(res => {
      if (res) {
        getInfo()
      }
    })
  })
}
// 新增用户弹窗是否显示
const addUserDialog = ref(false)
// 用户筛选框是否全为空
const ifAllNull = computed(() => Object.values(state.dialogForm).every(item => !!!item))
// 用户筛选
const table2LoadingRef = ref(false)
const userDialogGetData = () => {
  if (ifAllNull.value) {
    ElMessage.warning('请输入筛选条件。')
    return;
  }
  table2LoadingRef.value = true
  allUsers.value = []
  userApi.selectList({...state.pageParam2, ...state.dialogForm}).then(res => {
    state.total2 = res.total
    allUsers.value = res.list
    table2LoadingRef.value = false
  })
}
// 清除用户筛选
const userDialogClear = () => {
  filterFormRef.value?.resetFields()
  allUsers.value = []
}
// 分页查询
const pageChange2 = (newVal: PageDto) => {
  state.pageParam2.pageNum = newVal.pageNum
  state.pageParam2.pageSize = newVal.pageSize
  userDialogGetData()
}
// 选中行
const selectRows2 = ref<UserDto[]>([])
// 修改选中行
const handleSelectionChange2 = (val: UserDto[]) => {
  selectRows2.value = val
}
const dialogButtonLoadingRef = ref(false)
// 取消新增用户部门
const dialogCancel = () => {
  dialogButtonLoadingRef.value = false
  addUserDialog.value = false
  selectRows2.value = []
}
// 确认新增用户部门
const dialogConfirm = () => {
  dialogButtonLoadingRef.value = true
  const param = {
    userId: selectRows2.value.map(item => item.id),
    deptId: props.selectDept.id,
    loginRole: 'admin',
  }
  userDeptUpdDU(param).then(res => {
    getInfo()
    dialogCancel()
  }).finally(() => {
    dialogButtonLoadingRef.value = false
  })
}

// 删除用户部门
const deleteUserDept = (userId: string) => {
  ElMessageBox.confirm(
      `此操作将删除选中的 1 条数据，且无法撤销，请确认是否继续？`,
      '警告',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
        draggable: true
      }
  ).then(() => {
    const find = userDeptsOfThisDept.value.find(item => item.userId === userId)
    if (find) {
      userDeptApi.deleteList(find.id).then(res => {
        if (res) {
          getInfo()
        }
      })
    }
  })
}
</script>

<template>
  <!--部门信息-->
  <el-divider content-position="left">
    <el-text size="large" style="font-weight: bold;">部门信息</el-text>
  </el-divider>
  <el-form>
    <el-row>
      <el-col :span="8">
        <el-form-item :label="deptDict.label">
          {{ props.selectDept.label }}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="deptDict.ifAdmin">
          {{ props.selectDept.ifAdmin }}
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>

  <!--用户列表-->
  <el-divider content-position="left">
    <el-text size="large" style="font-weight: bold;">用户列表</el-text>
  </el-divider>
  <!--弹窗，用于新增时的选择-->
  <el-dialog
      :width="CONFIG.dialog_width_wider"
      v-model="addUserDialog"
      title="选择用户"
      draggable
      append-to-body
      destroy-on-close
  >
    <el-form
        class="demo-form-inline"
        :model="state.dialogForm"
        :inline="true"
        ref="filterFormRef"
        @keyup.enter="userDialogGetData"
    >
      <el-form-item :label="userDict.id" prop="id">
        <el-input v-model="state.dialogForm.id" :placeholder="userDict.id"/>
      </el-form-item>
      <el-form-item :label="userDict.username" prop="username">
        <el-input v-model="state.dialogForm.username" :placeholder="userDict.username"/>
      </el-form-item>
      <el-form-item :label="userDict.nickname" prop="nickname">
        <el-input v-model="state.dialogForm.nickname" :placeholder="userDict.nickname"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="userDialogGetData">筛选</el-button>
        <el-button @click="userDialogClear">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
        v-loading="table2LoadingRef"
        :data="allUsers"
        @selection-change="handleSelectionChange2"
    >
      <template #empty>
        <template v-if="ifAllNull">
          <el-tag type="warning">请输入筛选条件，随后点击“筛选”按钮。</el-tag>
        </template>
      </template>
      <el-table-column fixed type="selection" width="55"/>
      <el-table-column fixed prop="id" :label="userDict.id" width="80"/>
      <!--上面id列的宽度改一下-->
      <!--在此下方添加表格列-->
      <el-table-column prop="username" :label="userDict.username" width="120"/>
      <el-table-column prop="nickname" :label="userDict.nickname" width="120"/>
      <el-table-column prop="avatar" :label="userDict.avatar" width="120">
        <template #default="{row}">
          <el-image style="width: 50px;height: 50px;border-radius: 8px;" :src="sysStore.urlAddAuth(fileBaseUrl+row.avatar)" fit="contain">
            <template #error>
              <div></div>
            </template>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="sex" :label="userDict.sex" width="120"/>
      <el-table-column prop="email" :label="userDict.email" width="120"/>
      <el-table-column prop="tel" :label="userDict.tel" width="120"/>
      <template #append>
        <div class="el-table-append-box">
          <span>此表格的多选<span class="underline">不支持</span>{{ `跨分页保存，当前已选 ${selectRows2.length} 条数据。` }}</span>
        </div>
      </template>
    </el-table>
    <Pagination
        v-if="state.total2!==-1"
        :total="Number(state.total2)"
        :page-num="state.pageParam2.pageNum"
        :page-size="state.pageParam2.pageSize"
        @page-change="pageChange2"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button :disabled="dialogButtonLoadingRef" @click="dialogCancel">取消</el-button>
        <el-button type="primary" :disabled="dialogButtonLoadingRef" @click="dialogConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>

  <el-form
      class="demo-form-inline"
      ref="filterForm2Ref"
      :model="state.pageParam1"
      :inline="true"
      @keyup.enter="getInfo"
  >
    <el-form-item :label="userDeptDict.userId" prop="userId">
      <el-input v-model="state.pageParam1.userId" :placeholder="userDeptDict.userId"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getInfo">筛选</el-button>
      <el-button @click="clearFFormGetInfo">重置</el-button>
    </el-form-item>
  </el-form>

  <el-button type="primary" plain :icon="Refresh" @click="getInfo">刷新</el-button>
  <el-button type="primary" plain :icon="Plus" @click="addUser">添加用户</el-button>
  <el-button type="danger" plain :icon="Delete" :disabled="selectRows1.length===0" @click="delUser">移除用户</el-button>

  <!--当前部门的用户-->
  <el-table
      v-loading="table1LoadingRef"
      :data="usersOfThisDept"
      @selection-change="handleSelectionChange1"
  >
    <el-table-column fixed type="selection" width="55"/>
    <el-table-column fixed prop="id" :label="userDict.id" width="80"/>
    <!--上面id列的宽度改一下-->
    <!--在此下方添加表格列-->
    <el-table-column prop="username" :label="userDict.username" width="120"/>
    <el-table-column prop="nickname" :label="userDict.nickname" width="120"/>
    <el-table-column prop="avatar" :label="userDict.avatar" width="120">
      <template #default="{row}">
        <el-image style="width: 50px;height: 50px;border-radius: 8px;" :src="sysStore.urlAddAuth(fileBaseUrl+row.avatar)" fit="contain">
          <template #error>
            <div></div>
          </template>
        </el-image>
      </template>
    </el-table-column>
    <el-table-column prop="sex" :label="userDict.sex" width="120"/>
    <el-table-column prop="email" :label="userDict.email" width="120"/>
    <el-table-column prop="tel" :label="userDict.tel" width="120"/>
    <el-table-column fixed="right" label="操作" min-width="140">
      <template #default="{row}">
        <div class="zs-table-data-operate-button-row">
          <el-button link type="danger" size="small" :icon="Delete" @click="deleteUserDept(row.id)">删除</el-button>
        </div>
      </template>
    </el-table-column>
    <template #append>
      <div class="el-table-append-box">
        <span>此表格的多选<span class="underline">不支持</span>{{ `跨分页保存，当前已选 ${selectRows1.length} 条数据。` }}</span>
      </div>
    </template>
  </el-table>
  <Pagination
      v-if="state.total1!==-1"
      :total="Number(state.total1)"
      :page-num="state.pageParam1.pageNum"
      :page-size="state.pageParam1.pageSize"
      @page-change="pageChange1"
  />
</template>

<style scoped>

</style>