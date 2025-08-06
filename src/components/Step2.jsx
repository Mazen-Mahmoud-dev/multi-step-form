export default function Step2({ value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Email:</label>
      <input
        className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        type="email"
        onChange={(e) => onChange("email", e.target.value)}
        placeholder="Enter email"
      />
    </div>
  );
}
