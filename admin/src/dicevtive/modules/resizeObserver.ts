import { Directive, DirectiveBinding } from 'vue'

interface ResizeObserverElement extends HTMLElement {
  _resizeObserver?: ResizeObserver
}

const resizeObserverDirective: Directive = {
  mounted(el: ResizeObserverElement, binding: DirectiveBinding) {
    const targetSelector = binding.value
    let targetElement: HTMLElement | null = null

    if (targetSelector) {
      if (targetSelector.startsWith('.')) {
        targetElement = document.querySelector(targetSelector)
      } else if (targetSelector.startsWith('#')) {
        targetElement = document.getElementById(targetSelector.slice(1))
      } else if (binding.instance?.$refs[targetSelector]) {
        targetElement = binding.instance.$refs[targetSelector] as HTMLElement
      }
    } else {
      targetElement = el.parentElement
    }

    if (!targetElement) {
      console.warn(`[v-min-height-from] Target element not found: ${targetSelector}`)
      return
    }

    const updateMinHeight = () => {
      const height = targetElement?.offsetHeight ?? 0
      el.style.minHeight = `${height}px`
    }

    const observer = new ResizeObserver(updateMinHeight)
    observer.observe(targetElement)

    updateMinHeight()

    el._resizeObserver = observer
  },
  unmounted(el: ResizeObserverElement) {
    if (el._resizeObserver) {
      el._resizeObserver.disconnect()
    }
  }
}

export default resizeObserverDirective
