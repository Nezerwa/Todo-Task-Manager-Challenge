import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Input } from "./input";

describe("Input", () => {
  it("renders input element", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("accepts text input", async () => {
    const user = userEvent.setup();
    render(<Input />);
    const input = screen.getByRole("textbox");

    await user.type(input, "Hello World");

    expect(input).toHaveValue("Hello World");
  });

  it("handles placeholder text", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("can be disabled", () => {
    render(<Input disabled />);
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });

  it("does not accept input when disabled", async () => {
    const user = userEvent.setup();
    render(<Input disabled />);
    const input = screen.getByRole("textbox");

    await user.type(input, "Test");

    expect(input).toHaveValue("");
  });

  it("handles different input types", () => {
    const { container } = render(<Input type="email" />);
    const input = container.querySelector("input");
    expect(input?.type).toBe("email");
  });

  it("accepts custom className", () => {
    const { container } = render(<Input className="custom-class" />);
    const input = container.querySelector(".custom-class");
    expect(input).toBeTruthy();
  });

  it("has correct data-slot attribute", () => {
    const { container } = render(<Input />);
    const input = container.querySelector("[data-slot='input']");
    expect(input).toBeInTheDocument();
  });

  it("handles onChange events", async () => {
    const user = userEvent.setup();
    let value = "";
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      value = e.target.value;
    };

    render(<Input onChange={handleChange} />);
    const input = screen.getByRole("textbox");

    await user.type(input, "Test");

    expect(value).toBe("Test");
  });

  it("handles controlled input", () => {
    const { rerender } = render(<Input value="Initial" onChange={() => {}} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("Initial");

    rerender(<Input value="Updated" onChange={() => {}} />);
    expect(input).toHaveValue("Updated");
  });

  it("handles default value", () => {
    render(<Input defaultValue="Default text" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("Default text");
  });

  it("supports number type", () => {
    const { container } = render(<Input type="number" />);
    const input = container.querySelector("input");
    expect(input?.type).toBe("number");
  });

  it("supports password type", () => {
    const { container } = render(<Input type="password" />);
    const input = container.querySelector("input");
    expect(input?.type).toBe("password");
  });

  it("supports email type", () => {
    const { container } = render(<Input type="email" />);
    const input = container.querySelector("input");
    expect(input?.type).toBe("email");
  });

  it("handles focus events", async () => {
    const user = userEvent.setup();
    let focused = false;
    const handleFocus = () => {
      focused = true;
    };

    render(<Input onFocus={handleFocus} />);
    const input = screen.getByRole("textbox");

    await user.click(input);

    expect(focused).toBe(true);
  });

  it("handles blur events", async () => {
    const user = userEvent.setup();
    let blurred = false;
    const handleBlur = () => {
      blurred = true;
    };

    render(<Input onBlur={handleBlur} />);
    const input = screen.getByRole("textbox");

    await user.click(input);
    await user.tab();

    expect(blurred).toBe(true);
  });

  it("has focus-visible ring styles", () => {
    const { container } = render(<Input />);
    const input = container.querySelector(".focus-visible\\:ring-ring\\/50");
    expect(input).toBeTruthy();
  });

  it("has error styles with aria-invalid", () => {
    const { container } = render(<Input aria-invalid="true" />);
    const input = container.querySelector(".aria-invalid\\:border-destructive");
    expect(input).toBeTruthy();
  });

  it("supports maxLength attribute", () => {
    const { container } = render(<Input maxLength={10} />);
    const input = container.querySelector("input");
    expect(input?.maxLength).toBe(10);
  });

  it("supports readOnly attribute", () => {
    render(<Input readOnly />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("readonly");
  });

  it("supports required attribute", () => {
    render(<Input required />);
    const input = screen.getByRole("textbox");
    expect(input).toBeRequired();
  });

  it("clears value when cleared", async () => {
    const user = userEvent.setup();
    render(<Input defaultValue="Initial" />);
    const input = screen.getByRole("textbox");

    await user.clear(input);

    expect(input).toHaveValue("");
  });
});
