"use client";

export default function ButtonShowcase() {
  return (
    <div className="flex flex-wrap gap-3">
      <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
        Primary
      </button>
      <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
        Secondary
      </button>
      <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700">
        Danger
      </button>
      <button className="px-4 py-2 text-sm font-medium text-gray-400 bg-gray-100 rounded-lg cursor-not-allowed" disabled>
        Disabled
      </button>
    </div>
  );
}
