"use client";

import { useState } from "react";
import { RectangleHorizontal, TextCursorInput, Bell } from "lucide-react";
import ButtonShowcase from "@/src/components/common-components/button-components/ButtonShowcase";
import InputFieldsShowcase from "@/src/components/common-components/input-fields-components/InputFieldsShowcase";
import ToastShowcase from "@/src/components/common-components/toast-components/ToastShowcase";

const sections = [
  { id: "buttons", label: "Buttons", icon: RectangleHorizontal },
  { id: "input-fields", label: "Input Fields", icon: TextCursorInput },
  { id: "toasts", label: "Toasts", icon: Bell },
];

export default function Components() {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(sections[0].id);

  const filtered = sections.filter((s) =>
    s.label.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside className="w-72 border-r border-gray-200 bg-white flex flex-col shrink-0">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-lg font-semibold">Components</h1>
        </div>

        <div className="p-3">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-gray-400"
          />
        </div>

        <nav className="flex-1 overflow-y-auto px-2 pb-4">
          {filtered.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`w-full text-left px-3 py-2 text-sm rounded-lg mb-0.5 flex items-center gap-2 ${
                active === s.id
                  ? "bg-gray-100 font-medium text-gray-900"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <s.icon size={16} />
              {s.label}
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="text-sm text-gray-400 px-3 py-2">No results</p>
          )}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {filtered
          .filter((s) => s.id === active)
          .map((s) => (
            <section key={s.id}>
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">
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
