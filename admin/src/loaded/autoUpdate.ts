import { getScriptTagFromHtmlText } from "@/utils/RegularUtils.ts";
import { ifSameArray } from "@/utils/ObjectUtils.ts";
import { baseUtils } from "@ms/common";

const whiteList = [
  {
    type: 'start',
    content: 'chrome-extension://'
  }
];

async function main() {
  await baseUtils.sleep(1000)
  const oldHtml = document.documentElement.outerHTML
  const oldTag_ = getScriptTagFromHtmlText(oldHtml)
  // 去除一些干扰项
  const oldTag = oldTag_.filter(str => {
    if (
      whiteList.filter(item => item.type === 'start').some(item => str.startsWith(item.content))
      || whiteList.filter(item => item.type === 'full').some(item => item.content === str)
    ) {
      return false
    }
    return true
  })
  const html = await fetch(`/?timestamp=${new Date().getTime()}`).then(res => res.text())
  const newTag = getScriptTagFromHtmlText(html)
  const ifNeedUpdate = !ifSameArray(oldTag, newTag)
  if (ifNeedUpdate) {
    const result = confirm('检测到新版本，请点击确定更新。')
    if (result) {
      location.reload()
    }
  }
}

main()
