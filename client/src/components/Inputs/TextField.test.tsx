import { render, fireEvent } from "@testing-library/react"
import TextField from "./TextField"

describe("components/TextField", () => {
  const setup = (props?: any) => {
    const utils = render(<TextField {...props} />)
    const input = utils.getByRole("input")
    return {
      input,
      ...utils,
    }
  }

  it("should render TextField correctly", async () => {
    const { input } = setup()
    expect(input).toBeTruthy()
  })
  it("should be contained on classname [Mui-disabled] if we disable it", async () => {
    const { input } = setup({ disabled: true })
    expect(input.className.includes("Mui-disabled")).toBe(true)
  })
  it("should handle text change value", async () => {
    const { input }: any = setup()
    expect(input.value).toBe("")
    fireEvent.change(input, { target: { value: "$23.0" } })
    expect(input.value).toBe("$23.0")
  })
  it("it should render a label", async () => {
    const placeholder = "input"
    const { input }: any = setup({ placeholder })
    expect(input.placeholder).toBe(placeholder)
  })
})
