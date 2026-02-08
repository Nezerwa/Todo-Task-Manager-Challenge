import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./button";
import { userEvent } from "@testing-library/user-event";

describe("Button", () => {
  it("renders correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("handles click events", async () => {
    const user = userEvent.setup();
    let clicked = false;
    const handleClick = () => {
      clicked = true;
    };

    render(<Button onClick={handleClick}>Click me</Button>);
    await user.click(screen.getByRole("button"));

    expect(clicked).toBe(true);
  });

  it("applies default variant", () => {
    render(<Button>Default</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("data-variant", "default");
  });

  it("applies destructive variant", () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("data-variant", "destructive");
  });

  it("applies outline variant", () => {
    render(<Button variant="outline">Outline</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("data-variant", "outline");
  });

  it("applies secondary variant", () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("data-variant", "secondary");
  });

  it("applies ghost variant", () => {
    render(<Button variant="ghost">Ghost</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("data-variant", "ghost");
  });

  it("applies link variant", () => {
    render(<Button variant="link">Link</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("data-variant", "link");
  });

  it("applies default size", () => {
    render(<Button>Default Size</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("data-size", "default");
  });

  it("applies xs size", () => {
    render(<Button size="xs">Extra Small</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("data-size", "xs");
  });

  it("applies sm size", () => {
    render(<Button size="sm">Small</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("data-size", "sm");
  });

  it("applies lg size", () => {
    render(<Button size="lg">Large</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("data-size", "lg");
  });

  it("applies icon size", () => {
    render(<Button size="icon">🔍</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("data-size", "icon");
  });

  it("applies icon-xs size", () => {
    render(<Button size="icon-xs">🔍</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("data-size", "icon-xs");
  });

  it("applies icon-sm size", () => {
    render(<Button size="icon-sm">🔍</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("data-size", "icon-sm");
  });

  it("applies icon-lg size", () => {
    render(<Button size="icon-lg">🔍</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("data-size", "icon-lg");
  });

  it("can be disabled", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("does not trigger click when disabled", async () => {
    const user = userEvent.setup();
    let clicked = false;
    const handleClick = () => {
      clicked = true;
    };

    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    );
    await user.click(screen.getByRole("button"));

    expect(clicked).toBe(false);
  });

  it("accepts custom className", () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("custom-class");
  });

  it("combines variant and size", () => {
    render(
      <Button variant="outline" size="lg">
        Combined
      </Button>
    );
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("data-variant", "outline");
    expect(button).toHaveAttribute("data-size", "lg");
  });

  it("accepts additional props", () => {
    render(
      <Button type="submit" aria-label="Submit form">
        Submit
      </Button>
    );
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveAttribute("aria-label", "Submit form");
  });

  it("has correct data-slot attribute", () => {
    render(<Button>Test</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("data-slot", "button");
  });
});
