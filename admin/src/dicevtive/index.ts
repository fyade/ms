import focus from "@/dicevtive/modules/focus.ts";
import hasPerm from "@/dicevtive/modules/hasPerm.ts";
import noMoreClick from "@/dicevtive/modules/noMoreClick.ts";
import resizeObserver from "@/dicevtive/modules/resizeObserver.ts";
import { App } from "vue";

export interface directiveBinding<T = any> {
  value: T
}

const directives = {
  install: function (app: App) {
    app.directive('focus', focus)
    app.directive('has-perm', hasPerm)
    app.directive('no-more-click', noMoreClick)
    app.directive('min-height-from', resizeObserver)
  }
}

export default directives
