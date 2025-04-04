import { directiveBinding } from "@/dicevtive";
import { useSysStore } from "@/store/module/sys.ts";
import { baseUtils } from "@ms/common";

const hasPerm = {
  mounted: (el: HTMLElement, binging: directiveBinding<string[] | string>) => {
    const sysStore = useSysStore();
    let ifHasPerm = false
    if (baseUtils.typeOf(binging.value) === 'array') {
      ifHasPerm = (binging.value as string[]).some(str => sysStore.getVisibleButton(sysStore.getCurrentSystem.perms, str))
    }
    if (baseUtils.typeOf(binging.value) === 'string') {
      ifHasPerm = sysStore.getVisibleButton(sysStore.getCurrentSystem.perms, binging.value as string)
    }
    if (!ifHasPerm) {
      el.remove()
    }
  }
}

export default hasPerm
