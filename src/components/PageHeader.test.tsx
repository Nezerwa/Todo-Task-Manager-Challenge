import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { PageHeader } from "./PageHeader";

vi.mock("@/lib/constants/navigation", () => ({
  sharedPages: [
    { href: "/hr-tasks", label: "HR Tasks Hub", icon: "FileText" },
    { href: "/windah", label: "Windah Comp", icon: "Wind" },
    { href: "/nospace", label: "NoSpace Dev", icon: "Box" },
  ],
  privatePages: [{ href: "/dribble", label: "Dribble Portfolio", icon: "Palette" }],
}));

const renderPageHeader = (initialPath = "/") => {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <PageHeader />
    </MemoryRouter>
  );
};

describe("PageHeader", () => {
  it("renders header element", () => {
    const { container } = renderPageHeader();
    const header = container.querySelector("header");
    expect(header).toBeInTheDocument();
  });

  it("renders plus button", () => {
    renderPageHeader();
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("displays current page in breadcrumb for shared pages", () => {
    renderPageHeader("/hr-tasks");
    expect(screen.getByText("HR Tasks Hub")).toBeInTheDocument();
    expect(screen.getByText("Shared Pages")).toBeInTheDocument();
  });

  it("displays current page in breadcrumb for tasks page", () => {
    renderPageHeader("/hr-tasks");
    expect(screen.getByText("HR Tasks Hub")).toBeInTheDocument();
  });

  it("renders action buttons", () => {
    const { container } = renderPageHeader();
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBeGreaterThan(1);
  });

  it("renders with dark mode classes", () => {
    const { container } = renderPageHeader();
    const header = container.querySelector("header");
    expect(header?.className).toContain("dark:bg-gray-950");
  });

  it("renders breadcrumb navigation", () => {
    renderPageHeader("/hr-tasks");
    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
  });

  it("handles unknown routes gracefully", () => {
    const { container } = renderPageHeader("/unknown");
    expect(container).toBeTruthy();
  });

  it("shows Shared Pages category for shared routes", () => {
    renderPageHeader("/hr-tasks");
    expect(screen.getByText("Shared Pages")).toBeInTheDocument();
  });

  it("shows Private Pages category for private routes", () => {
    renderPageHeader("/dribble");
    expect(screen.getByText("Private Pages")).toBeInTheDocument();
  });

  it("renders responsive layout classes", () => {
    const { container } = renderPageHeader();
    const header = container.querySelector("header");
    const innerDiv = header?.querySelector("div");
    expect(innerDiv?.className).toContain("flex");
    expect(innerDiv?.className).toContain("items-center");
  });

  it("renders separator element", () => {
    const { container } = renderPageHeader();
    const separator = container.querySelector(".bg-gray-300");
    expect(separator).toBeInTheDocument();
  });
});
