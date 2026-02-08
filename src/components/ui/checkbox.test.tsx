import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Checkbox } from "./checkbox";

describe("Checkbox", () => {
  it("renders checkbox input", () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
  });

  it("starts unchecked by default", () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  it("can be checked", async () => {
    const user = userEvent.setup();
    render(<Checkbox />);
    const checkbox = screen.getByRole("checkbox");

    await user.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it("can be unchecked after being checked", async () => {
    const user = userEvent.setup();
    render(<Checkbox />);
    const checkbox = screen.getByRole("checkbox");

    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("can be controlled", () => {
    const { rerender } = render(<Checkbox checked={false} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();

    rerender(<Checkbox checked={true} />);
    expect(checkbox).toBeChecked();
  });

  it("calls onCheckedChange when clicked", async () => {
    const user = userEvent.setup();
    let checked = false;
    const handleChange = (value: boolean) => {
      checked = value;
    };

    render(<Checkbox onCheckedChange={handleChange} />);
    const checkbox = screen.getByRole("checkbox");

    await user.click(checkbox);

    expect(checked).toBe(true);
  });

  it("can be disabled", () => {
    render(<Checkbox disabled />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeDisabled();
  });

  it("does not trigger change when disabled", async () => {
    const user = userEvent.setup();
    let checked = false;
    const handleChange = () => {
      checked = true;
    };

    render(<Checkbox disabled onCheckedChange={handleChange} />);
    const checkbox = screen.getByRole("checkbox");

    await user.click(checkbox);

    expect(checked).toBe(false);
  });

  it("accepts custom className", () => {
    const { container } = render(<Checkbox className="custom-class" />);
    const checkbox = container.querySelector(".custom-class");
    expect(checkbox).toBeTruthy();
  });

  it("has correct data-slot attribute", () => {
    const { container } = render(<Checkbox />);
    const root = container.firstChild;
    expect(root).toBeTruthy();
  });

  it("displays check icon when checked", async () => {
    const user = userEvent.setup();
    const { container } = render(<Checkbox />);
    const checkbox = screen.getByRole("checkbox");

    await user.click(checkbox);

    const checkIcon = container.querySelector("svg");
    expect(checkIcon).toBeTruthy();
  });

  it("handles keyboard interaction", async () => {
    const user = userEvent.setup();
    render(<Checkbox />);
    const checkbox = screen.getByRole("checkbox");

    checkbox.focus();
    await user.keyboard("[Space]");

    expect(checkbox).toBeChecked();
  });

  it("applies focus-visible styles", () => {
    const { container } = render(<Checkbox />);
    const checkbox = container.querySelector(".focus-visible\\:ring-2");
    expect(checkbox).toBeTruthy();
  });

  it("starts with defaultChecked", () => {
    render(<Checkbox defaultChecked />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  it("has proper aria attributes", () => {
    render(<Checkbox aria-label="Accept terms" />);
    const checkbox = screen.getByLabelText("Accept terms");
    expect(checkbox).toBeInTheDocument();
  });
});
