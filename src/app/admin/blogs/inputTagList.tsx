import { useState } from "react";
import { X } from "lucide-react";
import PInput from "./input";

function InputTagList({ value = [], setList }: any) {
  const [currentValue, setCurrentValue] = useState<any>("");

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && currentValue.trim() !== "") {
      e.preventDefault();
      if (!value.includes(currentValue?.trim())) {
        const newList = [...value, currentValue.trim()];
        setList(newList);
        setCurrentValue("");
      }
    }
  };

  const removeTag = (tagToRemove: any) => {
    const newList = value.filter((tag: any) => tag !== tagToRemove);
    setList(newList);
  };

  return (
    <div className="w-full">
      <PInput
        title="Tags"
        placeholder="Press Enter to add tag"
        value={currentValue}
        onChange={(e: any) => setCurrentValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {/* Tag list */}
      <div className="mt-2 flex flex-wrap gap-2">
        {value.map((tag: any, index: number) => (
          <div
            key={index}
            className="flex items-center gap-1 rounded-full bg-gray-200 px-3 py-1 text-sm"
          >
            <span className="break-all">{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-gray-600 hover:text-red-500"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InputTagList;
