export default function Step3({ value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Age:</label>
      <input
        className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={(e) => onChange("age", e.target.value)}
        placeholder="Enter age"
        type="number"
      />
    </div>
  );
}
