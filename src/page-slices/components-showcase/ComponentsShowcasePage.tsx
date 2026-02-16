"use client";

import { useState } from "react";
import { RectangleHorizontal, TextCursorInput, Bell } from "lucide-react";
import { ThemeToggle } from "@/src/shared/ui/theme-toggle";
import ButtonShowcase from "./ButtonShowcase";
import { InputFieldsShowcase } from "./InputFieldsShowcase";
import { ToastShowcase } from "./ToastShowcase";

const sections = [
  { id: "buttons", label: "Buttons", icon: RectangleHorizontal },
  { id: "input-fields", label: "Input Fields", icon: TextCursorInput },
  { id: "toasts", label: "Toasts", icon: Bell },
];

export function ComponentsShowcasePage() {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(sections[0].id);

  const filtered = sections.filter((s) =>
    s.label.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex h-screen bg-main-background text-foreground">
      {/* Sidebar */}
      <aside className="w-72 border-r border-border bg-card flex flex-col shrink-0">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h1 className="text-lg font-semibold">Components</h1>
          <ThemeToggle />
        </div>

        <div className="p-3">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-input rounded-lg outline-none bg-card text-foreground placeholder:text-placeholder focus:border-muted-foreground"
          />
        </div>

        <nav className="flex-1 overflow-y-auto px-2 pb-4">
          {filtered.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`w-full text-left px-3 py-2 text-sm rounded-lg mb-0.5 flex items-center gap-2 ${
                active === s.id
                  ? "bg-accent font-medium text-accent-foreground"
                  : "text-muted-foreground hover:bg-hover"
              }`}
            >
              <s.icon size={16} />
              {s.label}
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground px-3 py-2">
              No results
            </p>
          )}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {filtered
          .filter((s) => s.id === active)
          .map((s) => (
            <section key={s.id}>
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-border">
                {s.label}
              </h2>
              {s.id === "buttons" && <ButtonShowcase />}
              {s.id === "input-fields" && <InputFieldsShowcase />}
              {s.id === "toasts" && <ToastShowcase />}
            </section>
          ))}
      </main>
    </div>
  );
}
