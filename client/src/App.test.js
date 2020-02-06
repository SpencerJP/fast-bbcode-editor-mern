import React from "react"
import { render } from "@testing-library/react"
import App from "./App"

test("renders Login button", () => {
	const { getByText } = render(<App />)
	const linkElement = getByText(/(Login|Logout)/i)
	expect(linkElement).toBeInTheDocument()
})
