import { render, screen } from "@testing-library/react"
import Container from "./Container"

describe("components/Container", () => {
  it("should render Container correctly", async () => {
    render(<Container data-testid='container' />)
    const wrapper = await screen.findByTestId("container")
    expect(wrapper).toBeTruthy()
  })
  it("should render children element", async () => {
    const child = <div>hello child</div>
    render(<Container children={child} data-testid='container' />)
    const wrapper = await screen.findByTestId("container")
    expect(wrapper.firstChild).toBeInTheDocument()
    expect(wrapper.children[0].textContent).toEqual("hello child")
  })
})
