/**
 * 冒泡排序
 * @param {} arr
 * @returns 
 */
const bubblingSort = (arr) => {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = arr.length - 1; j > i; j--) {
      if (arr[j] > arr[j - 1]) {
        const temp = arr[j];
        arr[j] = arr[j - 1];
        arr[j - 1] = temp;
      }
    }
  }
  return arr;
};