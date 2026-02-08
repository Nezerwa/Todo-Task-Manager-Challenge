import { useState } from "react";
import { Calendar, AlignLeft, CheckSquare, MessageCircle, Paperclip, User } from "lucide-react";
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
import type { Task, TaskStatus, User as UserType } from "@/types/task";
import { format } from "date-fns";

interface TaskEditDialogProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (task: Task) => void;
  availableUsers: UserType[];
}

export function TaskEditDialog({ task, open, onOpenChange, onSave, availableUsers }: TaskEditDialogProps) {
  const [editedTask, setEditedTask] = useState<Task | null>(task);

  if (task && (!editedTask || editedTask.id !== task.id)) {
    setEditedTask(task);
  }

  const toggleUser = (userId: number) => {
    if (!editedTask) return;
    
    const currentUsers = editedTask.assignedUsers || [];
    const isAssigned = currentUsers.some(u => u.id === userId);
    
    if (isAssigned) {
      // Remove user
      setEditedTask({
        ...editedTask,
        assignedUsers: currentUsers.filter(u => u.id !== userId)
      });
    } else {
      // Add user
      const userToAdd = availableUsers.find(u => u.id === userId);
      if (userToAdd) {
        setEditedTask({
          ...editedTask,
          assignedUsers: [...currentUsers, userToAdd]
        });
      }
    }
  };

  if (!editedTask) return null;

  const progressPercentage = editedTask.checklistProgress
    ? (editedTask.checklistProgress.completed / editedTask.checklistProgress.total) * 100
    : 0;

  const handleSave = () => {
    if (editedTask) {
      onSave(editedTask);
      onOpenChange(false);
    }
  };

  const statusOptions: { value: TaskStatus; label: string }[] = [
    { value: "todo", label: "To-do" },
    { value: "in-progress", label: "On Progress" },
    { value: "review", label: "Need Review" },
    { value: "done", label: "Done" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <h2 className="text-xl font-semibold text-gray-900">Edit Task</h2>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-semibold text-gray-700">
              Task Title
            </Label>
            <Input
              id="title"
              value={editedTask.todo}
              onChange={(e) => setEditedTask({ ...editedTask, todo: e.target.value })}
              className="text-lg font-semibold"
              placeholder="Enter task title"
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
            <Select
              value={editedTask.status}
              onValueChange={(value: TaskStatus) => setEditedTask({ ...editedTask, status: value })}
            >
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
              value={editedTask.description || ""}
              onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
              placeholder="Add a more detailed description..."
              className="min-h-30 resize-none"
            />
          </div>

          {editedTask.date && (
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Date
              </Label>
              <div className="text-sm text-gray-600">
                {format(new Date(editedTask.date), "MMMM d, yyyy")}
              </div>
            </div>
          )}

          {editedTask.checklistProgress && (
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <CheckSquare className="h-4 w-4" />
                Checklist Progress
              </Label>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm text-gray-900 font-medium">
                    {editedTask.checklistProgress.completed}/{editedTask.checklistProgress.total}{" "}
                    completed
                  </span>
                </div>
                <div className="flex gap-1 w-full">
                  {Array.from({ length: editedTask.checklistProgress.total }).map((_, index) => (
                    <div
                      key={index}
                      className="h-2 flex-1 rounded-full"
                      style={{
                        backgroundColor: index < editedTask.checklistProgress!.completed ? '#10B981' : '#E5E7EB'
                      }}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500">{Math.round(progressPercentage)}% complete</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-6 pt-2">
            {editedTask.commentsCount !== undefined && editedTask.commentsCount > 0 && (
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">
                  {editedTask.commentsCount}{" "}
                  {editedTask.commentsCount === 1 ? "comment" : "comments"}
                </span>
              </div>
            )}
            {editedTask.attachmentsCount !== undefined && editedTask.attachmentsCount > 0 && (
              <div className="flex items-center gap-2">
                <Paperclip className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">
                  {editedTask.attachmentsCount}{" "}
                  {editedTask.attachmentsCount === 1 ? "attachment" : "attachments"}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <User className="h-4 w-4" />
              Assign To
            </Label>
            <div className="flex flex-wrap gap-3">
              {availableUsers.map((user) => {
                const isSelected = editedTask.assignedUsers?.some(u => u.id === user.id) || false;
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
            <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700 text-white">
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
