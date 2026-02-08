import { useState } from "react";
import { AlignLeft, CheckSquare, User } from "lucide-react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { TaskStatus, User as UserType } from "@/types/task";

interface TaskCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (taskData: {
    todo: string;
    status: TaskStatus;
    description: string;
    assignedUsers: UserType[];
  }) => void;
  defaultStatus?: TaskStatus;
  availableUsers: UserType[];
}

export function TaskCreateDialog({
  open,
  onOpenChange,
  onSave,
  defaultStatus = "todo",
  availableUsers,
}: TaskCreateDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>(defaultStatus);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);

  const handleSave = () => {
    if (!title.trim()) {
      return;
    }

    const assignedUsers = availableUsers.filter((user) => selectedUserIds.includes(user.id));

    onSave({
      todo: title,
      status,
      description,
      assignedUsers,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setStatus(defaultStatus);
    setSelectedUserIds([]);
    onOpenChange(false);
  };

  const toggleUser = (userId: number) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const statusOptions: { value: TaskStatus; label: string }[] = [
    { value: "todo", label: "To-do" },
    { value: "in-progress", label: "On Progress" },
    { value: "review", label: "Need Review" },
    { value: "done", label: "Done" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <h2 className="text-xl font-semibold text-gray-900">Create New Task</h2>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          {/* Task Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-semibold text-gray-700">
              Task Title *
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg"
              placeholder="Enter task title"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="status"
              className="text-sm font-semibold text-gray-700 flex items-center gap-2"
            >
              <CheckSquare className="h-4 w-4" />
              Status
            </Label>
            <Select value={status} onValueChange={(value: TaskStatus) => setStatus(value)}>
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-sm font-semibold text-gray-700 flex items-center gap-2"
            >
              <AlignLeft className="h-4 w-4" />
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a detailed description..."
              className="min-h-30 resize-none"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <User className="h-4 w-4" />
              Assign To
            </Label>
            <div className="flex flex-wrap gap-3">
              {availableUsers.map((user) => {
                const isSelected = selectedUserIds.includes(user.id);
                return (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => toggleUser(user.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                      isSelected
                        ? "border-purple-600 bg-purple-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Avatar className="h-6 w-6 rounded-md">
                      <AvatarImage src={user.image} alt={user.name} className="object-cover" />
                      <AvatarFallback className="text-xs bg-purple-600 text-white rounded-md">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-700">{user.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!title.trim()}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Create Task
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
