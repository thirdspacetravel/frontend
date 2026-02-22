import React, { useState } from "react";
import CloseIcon from "../../../icons/CloseIcon";
import { TextInput } from "../../../components/utils/InputUtils";
import Button from "../../../components/utils/Button";
const TripCategorySelector: React.FC = () => {
  const [categories, setCategories] = useState([
    { id: "weekend", label: "Weekend Gateway", checked: false },
    { id: "trekking", label: "Trekking", checked: false },
    { id: "cultural", label: "Cultural", checked: false },
    { id: "backpacking", label: "Backpacking", checked: false },
  ]);

  const [newCategory, setNewCategory] = useState("");

  const removeCategory = (id: string) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  const handleAddCategory = () => {
    const trimmedCategory = newCategory.trim();

    if (trimmedCategory) {
      const id = trimmedCategory.toLowerCase().replace(/\s+/g, "-");
      const alreadyExists = categories.some((cat) => cat.id === id);

      if (!alreadyExists) {
        setCategories([
          ...categories,
          { id, label: trimmedCategory, checked: true },
        ]);
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
              key={cat.id}
              className="category-item"
              onClick={() => removeCategory(cat.id)}
            >
              <span className="category-item__label">{cat.label}</span>
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
