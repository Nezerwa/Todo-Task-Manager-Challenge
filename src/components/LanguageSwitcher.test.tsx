import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { LanguageSwitcher } from "./LanguageSwitcher";

const mockChangeLanguage = vi.fn();

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "language.english": "English",
        "language.french": "French",
        "language.switchLanguage": "Switch language",
      };
      return translations[key] || key;
    },
    i18n: {
      language: "en",
      changeLanguage: mockChangeLanguage,
    },
  }),
}));

describe("LanguageSwitcher", () => {
  it("renders language switcher button", () => {
    render(<LanguageSwitcher />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("has proper aria-label", () => {
    render(<LanguageSwitcher />);
    expect(screen.getByLabelText("Switch language")).toBeInTheDocument();
  });

  it("opens dropdown menu when clicked", async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);

    await user.click(screen.getByRole("button"));

    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.getByText("French")).toBeInTheDocument();
  });

  it("displays language options with flags", async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);

    await user.click(screen.getByRole("button"));

    expect(screen.getByText("🇺🇸")).toBeInTheDocument();
    expect(screen.getByText("🇫🇷")).toBeInTheDocument();
  });

  it("highlights current language", async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);

    await user.click(screen.getByRole("button"));

    const englishOption = screen.getByText("English").closest("div");
    expect(englishOption?.className).toContain("bg-purple-50");
  });

  it("changes language when option is selected", async () => {
    const user = userEvent.setup();
    mockChangeLanguage.mockClear();

    render(<LanguageSwitcher />);

    await user.click(screen.getByRole("button"));
    await user.click(screen.getByText("French"));

    expect(mockChangeLanguage).toHaveBeenCalledWith("fr");
  });

  it("renders with ghost button variant", () => {
    render(<LanguageSwitcher />);
    const button = screen.getByRole("button");
    expect(button.getAttribute("data-variant")).toBe("ghost");
  });

  it("has correct button size", () => {
    render(<LanguageSwitcher />);
    const button = screen.getByRole("button");
    expect(button.className).toContain("h-8 w-8");
  });

  it("displays Languages icon", () => {
    const { container } = render(<LanguageSwitcher />);
    const svg = container.querySelector("svg");
    expect(svg).toBeTruthy();
  });
});
