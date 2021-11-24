// 去抖
export const debounce = (fn, ms = 500) => {
  let timer = null;
  return (...rest) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn(...rest);
    }, ms);
  };
};

// 节流
export const throttle = (fn, ms = 500) => {
  let timer = null;
  return (...rest) => {
    if (!timer) {
      timer = setInterval(() => {
        timer = null;
        fn(...rest);
      }, ms);
    }
  };
}

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