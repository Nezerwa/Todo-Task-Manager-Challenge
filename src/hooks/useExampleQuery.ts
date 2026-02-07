import { useQuery } from "@tanstack/react-query";

// Example query hook - replace with your actual API calls
export function useExampleQuery() {
  return useQuery({
    queryKey: ["example"],
    queryFn: async () => {
      // Replace with actual API call
      const response = await fetch("https://api.example.com/data");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    // Optional: override default options for this specific query
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}
