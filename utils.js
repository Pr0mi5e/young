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