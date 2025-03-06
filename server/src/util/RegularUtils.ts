/**
 * 获取数据表名
 * @param str
 */
export function getDBTableName(str: string): string {
  const regExpMatchArray = str.match(/[\u4e00-\u9fa5-]+/);
  let aaa = (regExpMatchArray && regExpMatchArray.length > 0) ? regExpMatchArray[0] : str;
  if (aaa.endsWith('表') && !aaa.endsWith('-表')) {
    aaa = aaa.substring(0, aaa.length - 1);
  }
  return aaa;
}

/**
 * 把字符串根据/或者\分割
 * @param path
 */
export function splitStrByLine(path: string) {
  // 使用正则表达式匹配斜杠或反斜杠，并分割字符串
  return path.split(/\/|\\/).filter(_ => _);
}
