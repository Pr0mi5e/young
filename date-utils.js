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