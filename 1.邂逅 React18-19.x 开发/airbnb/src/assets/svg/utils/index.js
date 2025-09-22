// 转换svg中style标签在react的写法
function styleStrToObject(styleStr) {
  const obj = {},
    s = styleStr
      .toLowerCase()
      // 在字符串中全局搜索所有“连字符 - 后面紧跟的任意一个字符”，并且将这个字符单独捕获（记录下来）。
      .replace(/-(.)/g, function (m, g) {
        return g.toUpperCase();
      })
      ///;\s?$/g 匹配字符串末尾可能存在的 ; 以及它前面可能有的一个空格/空白符。
      .replace(/;\s?$/g, "")
      // /:|;/g在字符串中全局查找所有的冒号 : 或分号 ;
      .split(/:|;/g);
  for (var i = 0; i < s.length; i += 2)
    // /\s/g 用于匹配字符串中的所有空白字符。让我来详细解释它的含义并提供一些实际应用示例。
    // /^\s+|\s+$/g匹配字符串开头和结尾处的一个或多个空白字符。标志g表示全局匹配
    obj[s[i].replace(/\s/g, "")] = s[i + 1].replace(/^\s+|\s+$/g, "");
  return obj;
}

export { styleStrToObject };
