import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Task, TaskFormData, TodosResponse } from "@/types/task";

const API_BASE = "https://dummyjson.com/todos";

// Fetch all todos
export const useTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: async (): Promise<TodosResponse> => {
      const response = await fetch(API_BASE);

      if (!response.ok) throw new Error("Failed to fetch todos");
      return response.json();
    },
  });
};

// Fetch single todo
export const useTodo = (id: number) => {
  return useQuery({
    queryKey: ["todos", id],
    queryFn: async (): Promise<Task> => {
      const response = await fetch(`${API_BASE}/${id}`);
      if (!response.ok) throw new Error("Failed to fetch todo");
      return response.json();
    },
    enabled: !!id,
  });
};

// Create todo
export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TaskFormData): Promise<Task> => {
      const response = await fetch(`${API_BASE}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create todo");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

// Update todo
export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: Partial<TaskFormData>;
    }): Promise<Task> => {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update todo");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

// Delete todo
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number): Promise<Task> => {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete todo");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
