import request from "@/api/request.ts";
import {
  ViewRealTimeDirs,
  ViewRealTimeSelDirsDto,
  ViewRealTimeSelFileDto
} from "@/type/module/main/sysLog/viewRealTime.ts";

export const viewRealTimeApi = {
  selDirs: (params: ViewRealTimeSelDirsDto) => request<ViewRealTimeDirs[]>({
    url: '/main/sys-log/view-real-time/dirs',
    method: 'GET',
    params: params
  }),
  selFile: (params: ViewRealTimeSelFileDto) => request<string>({
    url: '/main/sys-log/view-real-time/file',
    method: 'GET',
    params: params
  })
}
