import { useState, ChangeEvent } from "react";

interface iTag {
  tags: string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  maxTags: number;
  className?: string;
}

export const TagField = ({
  tags,
  addTag,
  removeTag,
  maxTags,
  className = "w-full border border-gray-300 rounded-md px-4 py-2",
}: iTag) => {
  const [userInput, setUserInput] = useState<string>("");

  const handleTagProcessing = (rawValue: string) => {
    const items = rawValue
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");

    for (let item of items) {
      if (tags.length >= maxTags) break;
      if (!tags.includes(item) && item.length <= 20) addTag(item);
    }

    setUserInput("");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInput(value);

    if (value.includes(",")) handleTagProcessing(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleTagProcessing(userInput);
    }
  };

  const handleBlur = () => {
    handleTagProcessing(userInput);
  };

  return (
    <div className="flex flex-col">
      <input
        name="keyword_tags"
        type="text"
        placeholder={
          tags.length < maxTags
            ? "Add a tag (comma or Enter to separate)"
            : `Max ${maxTags} tags reached`
        }
        className={className}
        onKeyDown={handleKeyPress}
        onChange={handleInputChange}
        onBlur={handleBlur}
        value={userInput}
        disabled={tags.length === maxTags}
      />

      <div className="flex flex-row flex-wrap gap-3 mt-4">
        {tags.map((tag: string, index: number) => (
          <span
            key={`${index}-${tag}`}
            className="inline-flex items-center px-3 py-2 rounded-[32px] text-sm shadow-sm font-medium bg-blue-100 text-blue-800"
          >
            {tag}
            <button
              className="ml-2 hover:text-blue-500"
              onClick={() => removeTag(tag)}
              title={`Remove ${tag}`}
            >
              &times;
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};
