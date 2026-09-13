import { Moon, Sun, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";
import Link from "next/link";

function NavPill({ to, label }: { to: string; label: string }) {
  return (
    <Link
      href={to}
      className="inline-flex items-center justify-center rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary/60 hover:text-primary"
    >
      {label}
    </Link>
  );
}

function ThemeToggle({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) {
  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border border-border bg-card transition-colors hover:border-primary/60"
    >
      <span
        className={cn(
          "absolute top-0.5 left-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300",
          isDark ? "translate-x-5" : "translate-x-0"
        )}
      >
        {isDark ? <Moon size={12} aria-hidden="true" /> : <Sun size={12} aria-hidden="true" />}
      </span>
    </button>
  );
}

function ProfileLink() {
  return (
    <Link
      href="/profile"
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary/60 hover:text-primary"
      aria-label="Profile"
    >
      <User size={16} aria-hidden="true" />
    </Link>
  );
}

export function Navbar() {
  const { isDark, toggleTheme, mounted } = useTheme();

  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="shrink-0 font-display text-xl font-medium tracking-tight text-foreground"
        >
          <span className="text-primary">x</span> folios
        </Link>

        <nav
          className="mx-auto flex w-1/2 min-w-0 items-center justify-between gap-4"
          aria-label="Primary navigation"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <NavPill to="/play" label="play" />
            <NavPill to="/add" label="Add +" />
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {mounted ? (
              <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
            ) : (
              <span className="relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border border-border bg-card">
                <span className="absolute top-0.5 left-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Sun size={12} aria-hidden="true" />
                </span>
              </span>
            )}
            <ProfileLink />
          </div>
        </nav>
      </div>
    </header>
  );
}
