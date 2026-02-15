"use client";

export default function InputFieldsShowcase() {
  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Text Input</label>
        <input
          type="text"
          placeholder="Enter text..."
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email Input</label>
        <input
          type="email"
          placeholder="you@example.com"
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password Input</label>
        <input
          type="password"
          placeholder="••••••••"
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Disabled Input</label>
        <input
          type="text"
          placeholder="Disabled"
          disabled
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed"
        />
      </div>
    </div>
  );
}
