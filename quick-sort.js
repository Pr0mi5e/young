/**
 * 快速排序
 * @param {*} arr 待排序数据
 * @param {*} left 排序数组最左指针
 * @param {*} right 排序数据最右指针
 */
const quickSort = (arr, left, right) => {
  const len = arr.length;
  let partitionIndex; // 数组分割索引
  left = typeof left !== 'number'
    ? 0
    : left;
  right = typeof right !== 'number'
    ? len
    : right;
  if (left < right) {
    partitionIndex = partition(arr, left, right);
    quickSort(arr, left, partitionIndex - 1);
    quickSort(arr, partitionIndex + 1, right);
  }
  return arr;
}

/**
 * 分区，找出分割索引
 * @param {*} arr 
 * @param {*} left 
 * @param {*} right 
 */
const partition = (arr, left, right) => {
  /**
   * 取数组第一个值作为基准值，
   * 从第二个值开始遍历，
   * 依次跟基准值作比较,
   * 比基准值小，和基准值后的第index个值交换位置，index++，
   * 意思就是把所有小于基准值的值依次排在基准值之后，
   * 遍历完数组之后，把基准值和最后一个小于基准值的值交换位置，
   * 此时基准值前面的值都是比基准值小，后面的值都比基准值大
   */
  const datum = arr[left]; // 基准值
  let index = left + 1;
  for(let i = index; i < right; i++) {
    if (arr[i] < datum) { // 数组中某个值比基准值小
      exchange(arr, i, index);
      index++;
    }
  }
  exchange(arr, left, index - 1);
  return index - 1;
}

const exchange = (arr, x, y) => {
  const temp = arr[x];
  arr[x] = arr[y];
  arr[y] = temp;
  return arr;
}
