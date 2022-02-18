import { render, fireEvent } from "@testing-library/react"
import Button from "./Button"

describe("components/Button", () => {
  const setup = (props?: any) => {
    const utils = render(<Button {...props} />)
    const button = utils.getByLabelText("button")
    return {
      button,
      ...utils,
    }
  }

  it("should render Button correctly", async () => {
    const { button } = setup()
    expect(button).toBeTruthy()
  })
  it("should be contained on classname [MuiButton-contained]", async () => {
    const { button } = setup({ disabled: true })
    expect(button.className.includes("MuiButton-contained")).toBe(true)
  })
  it('it should has a type="button"', async () => {
    const { button } = setup()
    expect(button).toHaveAttribute("type", "button")
  })
  it("it should handle onClick fun", async () => {
    const onClick = jest.fn()
    const { button } = setup({ onClick })
    fireEvent.click(button)
    expect(onClick).toHaveBeenCalled()
  })
  it("it should not allow to click on button when we disable it", async () => {
    const onClick = jest.fn()
    const { button } = setup({ onClick, disabled: true })
    fireEvent.click(button)
    expect(onClick).toHaveBeenCalledTimes(0)
  })
  it("should contained on className [Mui-disabled] if we disable it", async () => {
    const { button } = setup({ disabled: true })
    expect(button.className.includes("Mui-disabled")).toBe(true)
  })
})
