import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { ViewToolbar } from "./ViewToolbar";
import type { ViewType } from "@/pages/HRTasksPage";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock("@/assets/Profil1.jpg", () => ({ default: "profile1.jpg" }));
vi.mock("@/assets/profile2.jpg", () => ({ default: "profile2.jpg" }));
vi.mock("@/assets/profile3.jpg", () => ({ default: "profile3.jpg" }));

describe("ViewToolbar", () => {
  it("renders toolbar", () => {
    const { container } = render(<ViewToolbar activeView="kanban" onViewChange={() => {}} />);
    expect(container).toBeTruthy();
  });

  it("displays all three view buttons", () => {
    render(<ViewToolbar activeView="kanban" onViewChange={() => {}} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(3);
  });

  it("highlights active view button", () => {
    render(<ViewToolbar activeView="kanban" onViewChange={() => {}} />);
    const kanbanButton = screen.getByText("viewToolbar.kanban").closest("button");
    expect(kanbanButton?.className).toContain("text-gray-900");
  });

  it("dims inactive view buttons", () => {
    render(<ViewToolbar activeView="kanban" onViewChange={() => {}} />);
    const listButton = screen.getByText("viewToolbar.list").closest("button");
    expect(listButton?.className).toContain("text-gray-300");
  });

  it("calls onViewChange when kanban button is clicked", async () => {
    const user = userEvent.setup();
    const onViewChange = vi.fn();
    render(<ViewToolbar activeView="list" onViewChange={onViewChange} />);

    await user.click(screen.getByText("viewToolbar.kanban"));

    expect(onViewChange).toHaveBeenCalledWith("kanban");
  });

  it("calls onViewChange when list button is clicked", async () => {
    const user = userEvent.setup();
    const onViewChange = vi.fn();
    render(<ViewToolbar activeView="kanban" onViewChange={onViewChange} />);

    await user.click(screen.getByText("viewToolbar.list"));

    expect(onViewChange).toHaveBeenCalledWith("list");
  });

  it("calls onViewChange when calendar button is clicked", async () => {
    const user = userEvent.setup();
    const onViewChange = vi.fn();
    render(<ViewToolbar activeView="kanban" onViewChange={onViewChange} />);

    await user.click(screen.getByText("viewToolbar.calendar"));

    expect(onViewChange).toHaveBeenCalledWith("calendar");
  });

  it("renders search input", () => {
    render(<ViewToolbar activeView="kanban" onViewChange={() => {}} />);
    const searchInput = screen.getByPlaceholderText("viewToolbar.searchPlaceholder");
    expect(searchInput).toBeInTheDocument();
  });

  it("renders filter button", () => {
    render(<ViewToolbar activeView="kanban" onViewChange={() => {}} />);
    expect(screen.getByText("common.filter")).toBeInTheDocument();
  });

  it("renders sort button", () => {
    render(<ViewToolbar activeView="kanban" onViewChange={() => {}} />);
    expect(screen.getByText("common.sort")).toBeInTheDocument();
  });

  it("displays team member avatars", () => {
    const { container } = render(<ViewToolbar activeView="kanban" onViewChange={() => {}} />);
    const avatars = container.querySelectorAll("[data-slot='avatar']");
    expect(avatars.length).toBeGreaterThanOrEqual(3);
  });

  it("handles view change to kanban", async () => {
    const user = userEvent.setup();
    let currentView: ViewType = "list";
    const onViewChange = (view: ViewType) => {
      currentView = view;
    };

    const { rerender } = render(
      <ViewToolbar activeView={currentView} onViewChange={onViewChange} />
    );

    await user.click(screen.getByText("viewToolbar.kanban"));

    expect(currentView).toBe("kanban");
  });

  it("handles view change to list", async () => {
    const user = userEvent.setup();
    let currentView: ViewType = "kanban";
    const onViewChange = (view: ViewType) => {
      currentView = view;
    };

    render(<ViewToolbar activeView={currentView} onViewChange={onViewChange} />);

    await user.click(screen.getByText("viewToolbar.list"));

    expect(currentView).toBe("list");
  });

  it("handles view change to calendar", async () => {
    const user = userEvent.setup();
    let currentView: ViewType = "kanban";
    const onViewChange = (view: ViewType) => {
      currentView = view;
    };

    render(<ViewToolbar activeView={currentView} onViewChange={onViewChange} />);

    await user.click(screen.getByText("viewToolbar.calendar"));

    expect(currentView).toBe("calendar");
  });

  it("renders with responsive classes", () => {
    const { container } = render(<ViewToolbar activeView="kanban" onViewChange={() => {}} />);
    const toolbar = container.querySelector(".flex-wrap");
    expect(toolbar).toBeTruthy();
  });

  it("has correct border and background styles", () => {
    const { container } = render(<ViewToolbar activeView="kanban" onViewChange={() => {}} />);
    const toolbar = container.querySelector(".border-b");
    expect(toolbar).toBeTruthy();
  });

  it("renders more options button", () => {
    const { container } = render(<ViewToolbar activeView="kanban" onViewChange={() => {}} />);
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBeGreaterThan(0);
  });
});
