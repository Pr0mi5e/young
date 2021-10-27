export const dateFormat = (timestamp, fmt = 'yyyy-MM-dd hh:mm:ss') => {
  const date = timestamp ? new Date(timestamp) : new Date();
  const opt = {
    'y+': date.getFullYear().toString(),
    'M+': (date.getMonth() + 1).toString(),
    'd+': date.getDate().toString(),
    'h+': date.getHours().toString(),
    'm+': date.getMinutes().toString(),
    's+': date.getSeconds().toString()
  };
  Object.keys(opt).forEach(key => {
    fmt = fmt.replace(new RegExp(key), (value) => {
      return value.length < opt[key].length
        ? opt[key]
        : opt[key].padStart(value.length, '0');
    });
  });
  return fmt;
};

export const secondFormat = (time, fmt = 'dd天hh时mm分ss秒', noZero = false) => {
  const d = Math.floor(time / (60 * 60 * 24));
  if (new RegExp('d+').test(fmt)) time -= d * 60 * 60 * 24;
  const h = Math.floor(time / (60 * 60));
  if (new RegExp('h+').test(fmt)) time -= h * 60 * 60;
  const m = Math.floor(time / 60);
  if (new RegExp('m+').test(fmt)) time -= m * 60;
  const s = time;
  const opt = {
    '(d+):*-*[\\u4E00-\\u9FFF]*/*': d.toString(),
    '(h+):*-*[\\u4E00-\\u9FFF]*/*': h.toString(),
    '(m+):*-*[\\u4E00-\\u9FFF]*/*': m.toString(),
    '(s+):*-*[\\u4E00-\\u9FFF]*/*': s.toString()
  };
  Object.keys(opt).forEach((key) => {
    fmt = fmt.replace(new RegExp(key), (value, match) => {
      if (noZero && opt[key] === '0') return '';
      return match.length > opt[key].length
        ? value.replace(match, opt[key].padStart(match.length, '0'))
        : value.replace(match, opt[key]);
    });
  });
  return fmt;
};

const treeToMap = (tree, childNode = 'children', valueKey = 'id') => {
  let res = {};
  if (!tree || tree.constructor.name !== 'Object') return res;
  if (Object.keys(tree).length === 0) return res;
  const children = tree[childNode];
  Reflect.deleteProperty(tree, [childNode]);
  if (tree[valueKey] === void(0)) throw new Error(`property '${valueKey}' is not define in ${JSON.stringify(tree)}`); 
  res[tree[valueKey]] = tree;
  if (children && children.length > 0) {
    children.forEach((v) => {
      Object.assign(res, treeToMap(v, childNode, valueKey))
    });
    return res;
  } else {
    return res;
  }
};

const treeToArray = (tree, childNode = 'children') => {
  let res = [];
  if (!tree || tree.constructor.name !== 'Object') return res;
  if (Object.keys(tree).length === 0) return res;
  const children = tree[childNode];
  Reflect.deleteProperty(tree, [childNode]);
  res.push(tree);
  if (children && children.length > 0) {
    children.forEach((v) => {
      res = res.concat(treeToArray(v, childNode));
    });
    return res;
  } else {
    return res;
  }
}
