import { render, screen } from "@testing-library/react"
import Text from "./Text"

describe("components/Text", () => {
  it("should render Text correctly", async () => {
    render(<Text data-testid='text' />)
    const wrapper = await screen.findByTestId("text")
    expect(wrapper).toBeTruthy()
  })
  it("should render text", async () => {
    const value = "hello child"
    render(<Text children={value} data-testid='text' />)
    const wrapper = await screen.findByTestId("text")
    expect(wrapper.firstChild?.textContent).toEqual("hello child")
  })
})
