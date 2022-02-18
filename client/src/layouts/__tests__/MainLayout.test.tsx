import { render, screen } from "@testing-library/react"
import MainLayout from "../MainLayout"

describe("components/MainLayout", () => {
  it("should render MainLayout correctly", async () => {
    render(<MainLayout data-testid='layout' />)
    const wrapper = await screen.findByTestId("layout")
    expect(wrapper).toBeTruthy()
  })
  it("should render children element", async () => {
    const child = <div>children</div>
    render(<MainLayout children={child} data-testid='layout' />)
    const wrapper = await screen.findByTestId("layout")
    expect(wrapper.firstChild).toBeInTheDocument()
    expect(wrapper.firstChild?.firstChild.textContent).toEqual("children")
  })
})
