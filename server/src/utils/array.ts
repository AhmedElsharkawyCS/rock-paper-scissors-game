/**
 * returns a random value from given array
 * @param arr
 * @returns string
 */
export const randomValue = (arr: Array<string | number>) => {
  if (arr.length <= 0) throw new Error("array should has at least one element")
  return arr[Math.floor(Math.random() * arr.length)]
}
/**
 * returns a random value from a given array except for given value
 * @param arr
 * @param val
 * @returns string
 */
export const randomValueExcept = (arr: Array<string | number>, val: string | number) => {
  if (arr.length < 2) throw new Error("array should has at least 2 elements")
  const index = arr.indexOf(val)
  if (index === -1) throw new Error("value does not exist in the array")
  const remainingArr = arr.slice(index + 1)
  return remainingArr[Math.floor(Math.random() * remainingArr.length)]
}
