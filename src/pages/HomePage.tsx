import { Button } from "@/components/ui/button";

export function HomePage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Todo Task Manager</h1>
        <p className="text-muted-foreground">Ready for feature development</p>
        <Button>Get Started</Button>
      </div>
    </div>
  );
}
