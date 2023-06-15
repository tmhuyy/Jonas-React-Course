import { useState } from "react";
import Form from "./components/Form";
import Logo from "./components/Logo";
import PackingList from "./components/PackingList";
import Status from "./components/Status";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

const App = function () {
  const [items, setItems] = useState([...initialItems]);
  const addItemHandler = function (enteredItem) {
    setItems((preItems) => [...preItems, enteredItem]);
  };

  const deleteItemHandler = function (id) {
    setItems((preItems) => {
      return preItems.filter((item) => item.id !== id);
    });
  };

  const clearListHandler = function () {
    const confirm = window.confirm("Do you want to delete all the items ?");
    confirm && setItems([]);
  };

  // const sortItemHandler = function (type) {
  //   switch (type) {
  //     case "inputOrder":
  //       setItems((preItems) => {
  //         const sortedItems = preItems.toSorted((a, b) => a.id - b.id);
  //         return sortedItems;
  //       });
  //       return;
  //     case "description":
  //       setItems((preItems) => {
  //         const sortedItems = preItems.toSorted((a, b) =>
  //           a.description.localeCompare(b.description)
  //         );
  //         return sortedItems;
  //       });
  //       return;
  //     case "packedStatus":
  //       setItems((preItems) => {
  //         const sortedItems = preItems.toSorted((a, b) => a.packed - b.packed);
  //         return sortedItems;
  //       });
  //       return;
  //     default:
  //       break;
  //   }
  // };

  const toggleItemHandler = function (id) {
    setItems((preItems) => {
      return preItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      );
    });
  };

  return (
    <main className="app">
      <Logo />
      <Form onAddItem={addItemHandler} lastIndex={initialItems.at(-1).id} />
      <PackingList
        items={items}
        onDeleteItem={deleteItemHandler}
        onClearList={clearListHandler}
        // onSortItem={sortItemHandler}
        onToggleItem={toggleItemHandler}
      />
      <Status items={items} />
    </main>
  );
};

export default App;
