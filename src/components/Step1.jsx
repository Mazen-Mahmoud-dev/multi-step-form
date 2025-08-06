export default function Step1({ value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Name:</label>
      <input
        className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={(e) => onChange("name", e.target.value)}
        placeholder="Enter name"
      />
    </div>
  );
}

