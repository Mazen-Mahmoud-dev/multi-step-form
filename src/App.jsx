import { useState,useMemo } from "react";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";


export default function App() {
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", age: "", profession: "" });
  const [error, setError] = useState("");

  const isDeveloper = formData.name.toLowerCase() === "developer";

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "name" && value.toLowerCase() === "developer") {
      setTimeout(() => setStepIndex(1), 100);
    }
  };

  const steps = useMemo(() => {
    const all = ["name", "email", "age"];
    return isDeveloper ? [...all, "profession"] : all;
  }, [isDeveloper]);

  const stepComponents = {
    name: <Step1 value={formData.name} onChange={updateField} />,
    email: <Step2 value={formData.email} onChange={updateField} />,
    age: <Step3 value={formData.age} onChange={updateField} />,
    profession: <Step4 value={formData.profession} onChange={updateField} />,
  };
  const isValidEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };
  const next = () => {
    const field = steps[stepIndex];
    const value = formData[field];
    if (!formData[field]) {
      setError(`${field} is required`);
      return;
    }
    if (field === "email" && !isValidEmail(value)) {
      setError("Invalid email format");
      return;
    }
    setError("");
    setStepIndex((i) => i + 1);
  };

  const back = () =>{setError("");return setStepIndex((i) => i - 1);}

  const handleSubmit = () => {
    const lastField = steps[steps.length - 1];
    if (!formData[lastField]) {
      setError(`${lastField} is required`);
      return;
    }
    setError("");
    console.log(JSON.stringify(formData, null, 2));
    alert("Data submitted successfully. Check the console for the data.");
  };

  const renderStepCircle = (index, field) => {
    const completed = formData[field] !== "";
    const active = index === stepIndex;

    return (
      <div key={field} className="flex items-center">
        <button
          disabled={!completed && !active}
          onClick={() => setStepIndex(index)}
          className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold border-2 transition-all duration-300 shadow-md
            ${completed || active ? "bg-blue-600 text-white border-blue-600" : "bg-white text-blue-600 border-blue-600"}
            ${!completed && !active ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:scale-105"}`}
        >
          {completed && !active ? "✓" : index + 1}
        </button>
        {index < steps.length - 1 && <div className="w-10 border-t-2 border-dashed border-blue-300 mx-2"></div>}
      </div>
    );
  };

  const currentField = steps[stepIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-lg mx-auto bg-white shadow-xl rounded-xl p-8 space-y-8">
        <div className="flex justify-center items-center">
          {steps.map((field, i) => renderStepCircle(i, field))}
        </div>

        {stepComponents[currentField]}

        {error && <div className="text-red-500 text-sm font-medium text-center">{error}</div>}

        <div className="flex justify-between items-center pt-4">
          {stepIndex > 0 && (
            <button onClick={back} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-full transition">Back</button>
          )}
          {stepIndex < steps.length - 1 && (
            <button onClick={next} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full transition">Next</button>
          )}
          {stepIndex === steps.length - 1 && (
            <button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full transition">Submit</button>
          )}
        </div>
      </div>
    </div>
  );
}
