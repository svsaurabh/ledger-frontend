import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Ledger frontend link", () => {
    render(<App />);
    const linkElement = screen.getByText(/Ledger Frontend/i);
    expect(linkElement).toBeInTheDocument();
});
