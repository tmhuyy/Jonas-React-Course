import { useState } from "react";

const Form = function ({ onAddItem, lastIndex }) {
  const [quantity, setQuantity] = useState(1);
  const [item, setItem] = useState("");

  const clearInput = function () {
    setQuantity(1);
    setItem("");
  };

  const validateItem = function (item) {
    if (item.trim().length > 0) return true;
    return false;
  };

  const addItemHandler = function (e) {
    e.preventDefault();
    if (!validateItem(item)) {
      alert("Please enter an item");
      return;
    }

    const newItem = {
      id: Date.now(),
      description: item,
      quantity,
      packed: false,
    };

    onAddItem(newItem);
    clearInput();
  };
  return (
    <form className="add-form" onSubmit={addItemHandler}>
      <h3>What do you need for your trip ?</h3>
      <select
        name="quantity"
        id="quantity"
        value={quantity}
        onChange={(e) => setQuantity(+e.target.value)}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((_, index) => (
          <option key={index} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        name="item"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />

      <button>Add</button>
    </form>
  );
};

export default Form;
