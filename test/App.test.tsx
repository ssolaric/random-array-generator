import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";

it("renders the title", async () => {
  const user = userEvent.setup();
  render(<App />);

  const input = screen.getByLabelText("Minimum value");
  await user.type(input, "11");
  expect(input).toHaveValue(11);
  expect(screen.getByText("Random Array Generator")).toBeInTheDocument();
});
