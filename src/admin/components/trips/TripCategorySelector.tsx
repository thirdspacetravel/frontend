import CloseIcon from "../../../icons/CloseIcon";
import { TextInput } from "../../../components/utils/InputUtils";
import Button from "../../../components/utils/Button";
import type { OnChangeHandler } from "./types";
import { useState } from "react";

const TripCategorySelector = ({
  onChange,
  categories,
}: {
  onChange: OnChangeHandler;
  categories: string[];
}) => {
  const [newCategory, setNewCategory] = useState("");
  const removeCategory = (categoryToRemove: string) => {
    onChange(
      "categories",
      categories.filter((cat) => cat !== categoryToRemove),
    );
  };

  const handleAddCategory = () => {
    const trimmedCategory = newCategory.trim();
    if (trimmedCategory) {
      const alreadyExists = categories.some(
        (cat) => cat.toLowerCase() === trimmedCategory.toLowerCase(),
      );

      if (!alreadyExists) {
        onChange("categories", [...categories, trimmedCategory]);
        setNewCategory("");
      }
    }
  };

  return (
    <aside className="content-canvas__card">
      <header className="content-canvas__header">
        <h2 className="content-canvas__title">Categories</h2>
      </header>

      <div className="content-canvas__body">
        <div className="content-canvas__list">
          {categories.map((cat) => (
            <label
              key={cat} // Using the string itself as the key
              className="category-item"
              onClick={() => removeCategory(cat)}
            >
              <span className="category-item__label">{cat}</span>
              <CloseIcon />
            </label>
          ))}
        </div>

        <div className="content-canvas__add">
          <TextInput
            label="Add Category"
            placeholder="Add custom category..."
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
          />
          <Button onClick={handleAddCategory} solid>
            Add
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default TripCategorySelector;
