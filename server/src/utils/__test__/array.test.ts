import { randomValue, randomValueExcept } from "../array"

describe("utils/array", () => {
  it("defines randomValue()", () => {
    expect(typeof randomValue).toBe("function")
  })
  it("defines rpsGamePlayerWithComputer()", () => {
    expect(typeof randomValueExcept).toBe("function")
  })
  it("randomValue takes an array and return random value", async () => {
    const arr = [1, 3, 5, 9]
    const result = randomValue(arr)
    expect(arr).toContain(result)
  })
  it("randomValue throw an error if the array input is empty", async () => {
    const arr = []
    const fun = () => randomValue(arr)
    expect(fun).toThrow()
  })
  it("randomValueExcept return a random value but not equal to the second param", async () => {
    const arr = [1, 3, 5, 9]
    const exceptVal = 9
    const result = randomValueExcept(arr, exceptVal)
    expect(result).not.toEqual(exceptVal)
  })
  it("randomValueExcept throw an error if length is less than 2", async () => {
    const arr = [1]
    const exceptVal = 9
    const fun = () => randomValueExcept(arr, exceptVal)
    expect(fun).toThrow()
  })
  it("randomValueExcept throw an error if second parameter is not exist in arr", async () => {
    const arr = [1, 10, 15]
    const exceptVal = 9
    const fun = () => randomValueExcept(arr, exceptVal)
    expect(fun).toThrow()
  })
})
