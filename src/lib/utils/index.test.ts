import { describe, it, expect } from "vitest";
import { cn } from "./index";

describe("cn utility", () => {
  it("merges class names correctly", () => {
    const result = cn("text-red-500", "bg-blue-500");
    expect(result).toBe("text-red-500 bg-blue-500");
  });

  it("handles conflicting Tailwind classes", () => {
    const result = cn("px-2", "px-4");
    expect(result).toBe("px-4");
  });

  it("removes duplicates", () => {
    const result = cn("text-red-500", "text-red-500");
    expect(result).toBe("text-red-500");
  });

  it("handles conditional classes with clsx", () => {
    const isActive = true;
    const result = cn("base-class", isActive && "active-class");
    expect(result).toBe("base-class active-class");
  });

  it("handles falsy values", () => {
    const result = cn("text-red-500", false, null, undefined, "bg-blue-500");
    expect(result).toBe("text-red-500 bg-blue-500");
  });

  it("handles arrays of classes", () => {
    const result = cn(["text-red-500", "bg-blue-500"]);
    expect(result).toBe("text-red-500 bg-blue-500");
  });

  it("handles objects with boolean values", () => {
    const result = cn({
      "text-red-500": true,
      "bg-blue-500": false,
      "p-4": true,
    });
    expect(result).toBe("text-red-500 p-4");
  });

  it("handles empty input", () => {
    const result = cn();
    expect(result).toBe("");
  });

  it("handles complex Tailwind conflicts", () => {
    const result = cn("p-2 px-4", "p-6");
    expect(result).toBe("p-6");
  });

  it("preserves dark mode classes", () => {
    const result = cn("text-gray-900", "dark:text-gray-100");
    expect(result).toBe("text-gray-900 dark:text-gray-100");
  });
});
