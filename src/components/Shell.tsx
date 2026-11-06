import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Dumbbell, LineChart, History } from "lucide-react";

export function Shell({ children }: { children: ReactNode }) {
  const tab = "flex flex-1 flex-col items-center gap-1 py-3 text-xs uppercase tracking-widest text-muted-foreground";
  return (
    <div className="mx-auto min-h-screen max-w-md pb-24">
      {children}
      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-md">
          <Link to="/" className={tab} activeProps={{ className: "text-primary" }} activeOptions={{ exact: true }}>
            <Dumbbell className="h-5 w-5" /> Train
          </Link>
          <Link to="/progress" className={tab} activeProps={{ className: "text-primary" }}>
            <LineChart className="h-5 w-5" /> Progress
          </Link>
          <Link to="/history" className={tab} activeProps={{ className: "text-primary" }}>
            <History className="h-5 w-5" /> History
          </Link>
        </div>
      </nav>
    </div>
  );
}
