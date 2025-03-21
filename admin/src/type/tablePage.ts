import { TypeIU, TypeOM } from "@/type/utils/base.ts";
import { PageVo } from "@/type/asiox.ts";

interface DialogForms_error {
  [key: string]: boolean | string
}

export interface State2<T = object, T2 = T> {
  dialogForm: T2
  dialogForms?: T2[]
  dialogForms_error?: DialogForms_error
  filterForm: Partial<T>
}

export class BaseClass {
  createRole?: string;
  updateRole?: string;
  createBy?: string;
  updateBy?: string;
  createTime?: Date;
  updateTime?: Date;
  deleted?: string;
}

export class PageDto {
  pageNum!: number
  pageSize!: number
}

export interface ApiConfig<T, T2 = T> {
  selectList: (obj: { [P in keyof Omit<T2, 'id'>]?: any } & { [P in keyof PageDto]: PageDto[P] }) => Promise<PageVo<T>>
  selectAll: (obj: { [P in keyof Omit<T2, 'id'>]?: any }) => Promise<T[]>
  selectById: (id: number | string) => Promise<T>
  selectByIds: (ids: (number | string)[]) => Promise<T[]>
  insertOne: (obj: Omit<T2, 'id'>) => Promise<any>
  updateOne: (obj: T2) => Promise<any>
  insertMore: (obj: Omit<T2, 'id'>[]) => Promise<any>
  updateMore: (obj: T2[]) => Promise<any>
  deleteList: (...ids: (number | string)[]) => Promise<any>
}

export class TablePageConfig<T = {}> {
  selectParam
  insUpdParam
  getDataOnMounted
  pageQuery
  watchDialogVisible
  dialogVisibleCallback
  beforeSelectListCallback
  selectListCallback
  beforeInsertCallback
  insertCallback
  beforeUpdateCallback
  updateCallback
  beforeDeleteCallback
  deleteCallback
  dialogFormLoadingFinishCallback
  bulkOperation
  changeActiveTabNameCallback
  activeTabMoreInsCallback
  activeTabMoreInsFinishCallback
  activeTabMoreDelCallback

  /**
   * @param selectParam 补充的查询参数
   * @param insUpdParam 补充的新增及修改参数
   * @param getDataOnMounted 页面加载时获取数据，默认true
   * @param pageQuery 分页，默认true
   * @param watchDialogVisible 监听dialogVisible变化，默认true
   * @param dialogVisibleCallback dialogVisible变化时的回调
   * @param beforeSelectListCallback selectList前的回调
   * @param selectListCallback selectList回调
   * @param beforeInsertCallback 新增前的回调
   * @param insertCallback 新增的回调
   * @param beforeUpdateCallback 修改前的回调
   * @param updateCallback 修改的回调
   * @param beforeDeleteCallback 删除前的回调
   * @param deleteCallback 删除的回调
   * @param dialogFormLoadingFinishCallback 弹出表单为修改时，表单加载完成后的回调
   * @param bulkOperation 弹出表单是否支持批量操作，默认false
   * @param changeActiveTabNameCallback 弹出表单切换操作单个与操作多个前调用的事件
   * @param activeTabMoreInsCallback 弹出表单为操作多个时，新增之前的回调函数
   * @param activeTabMoreInsFinishCallback 弹出表单为操作多个时，新增之后的回调函数
   * @param activeTabMoreDelCallback 弹出表单为操作多个时，删除的回调函数
   */
  constructor({
                selectParam = {},
                insUpdParam = {},
                getDataOnMounted = true,
                pageQuery = true,
                watchDialogVisible = true,
                dialogVisibleCallback = null,
                beforeSelectListCallback = null,
                selectListCallback = null,
                beforeInsertCallback = null,
                insertCallback = null,
                beforeUpdateCallback = null,
                updateCallback = null,
                beforeDeleteCallback = null,
                deleteCallback = null,
                dialogFormLoadingFinishCallback = null,
                bulkOperation = false,
                changeActiveTabNameCallback = null,
                activeTabMoreInsCallback = null,
                activeTabMoreInsFinishCallback = null,
                activeTabMoreDelCallback = null,
              }: {
                selectParam?: Partial<T>
                insUpdParam?: Partial<T>
                getDataOnMounted?: boolean
                pageQuery?: boolean
                watchDialogVisible?: boolean
                dialogVisibleCallback?: null | ((newVal: boolean) => void)
                beforeSelectListCallback?: null | Function
                selectListCallback?: null | Function
                beforeInsertCallback?: null | ((dialogType: TypeIU) => void)
                insertCallback?: null | ((dialogType: TypeIU) => void)
                beforeUpdateCallback?: null | ((dialogType: TypeIU) => void)
                updateCallback?: null | ((dialogType: TypeIU) => void)
                beforeDeleteCallback?: null | Function
                deleteCallback?: null | Function
                dialogFormLoadingFinishCallback?: null | ((activeTabName: TypeOM) => void)
                bulkOperation?: boolean
                changeActiveTabNameCallback?: null | ((newVal: TypeOM) => void)
                activeTabMoreInsCallback?: null | Function
                activeTabMoreInsFinishCallback?: null | Function
                activeTabMoreDelCallback?: null | ((index: number) => void)
              } = {}
  ) {
    this.selectParam = selectParam;
    this.insUpdParam = insUpdParam;
    this.getDataOnMounted = getDataOnMounted;
    this.pageQuery = pageQuery;
    this.watchDialogVisible = watchDialogVisible;
    this.dialogVisibleCallback = dialogVisibleCallback;
    this.beforeSelectListCallback = beforeSelectListCallback;
    this.selectListCallback = selectListCallback;
    this.beforeInsertCallback = beforeInsertCallback;
    this.insertCallback = insertCallback;
    this.beforeUpdateCallback = beforeUpdateCallback;
    this.updateCallback = updateCallback;
    this.beforeDeleteCallback = beforeDeleteCallback;
    this.deleteCallback = deleteCallback;
    this.dialogFormLoadingFinishCallback = dialogFormLoadingFinishCallback;
    this.bulkOperation = bulkOperation;
    this.changeActiveTabNameCallback = changeActiveTabNameCallback;
    this.activeTabMoreInsCallback = activeTabMoreInsCallback;
    this.activeTabMoreInsFinishCallback = activeTabMoreInsFinishCallback;
    this.activeTabMoreDelCallback = activeTabMoreDelCallback;
  }
}
