/**
 * 补0
 * @param num
 */
export function addZero(num: number, {} = {}) {
  return num < 10 ? '0' + num : num;
}

/**
 * 单位换算
 * @param num
 * @param scale
 * @param units
 * @param decimalDigits
 * @param addZero
 * @param showNuit
 */
export function unitConversion(num: number, {
  scale = 1000,
  units = [],
  decimalDigits = 2,
  addZero = true,
  showNuit = true
}: {
  scale?: number
  units?: string[]
  decimalDigits?: number
  addZero?: boolean
  showNuit?: boolean
} = {}) {
  let ret = num, index = 0
  while (ret >= scale && index < units.length) {
    index++
    ret /= scale
  }
  const s = addZero ? ret.toFixed(decimalDigits) : Number(ret.toFixed(decimalDigits)).toString()
  return `${s}${showNuit ? units[index] : ''}`
}

/**
 * 百分比换算
 * @param num
 * @param decimalDigits
 */
export function percentConversion(num, {
  decimalDigits = 2,
}: {
  decimalDigits?: number
} = {}) {
  return `${(num * 100).toFixed(decimalDigits)}%`
}