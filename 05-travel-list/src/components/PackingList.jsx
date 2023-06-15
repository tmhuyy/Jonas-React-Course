import { useState } from "react";
import PackingItems from "./PackingItems";

const PackingList = function ({
  items,
  onDeleteItem,
  onClearList,
  onToggleItem,
}) {
  const [sortType, setSortType] = useState("inputOrder");
  // derived state based on sortType state and items props
  let sortedItems;

  if (sortType === "inputOrder") sortedItems = items;
  if (sortType === "description")
    sortedItems = items.toSorted((a, b) =>
      a.description.localeCompare(b.description)
    );
  if (sortType === "packedStatus")
    sortedItems = items.toSorted((a, b) => a.packed - b.packed);

  const changeSortTypeHandler = function (e) {
    setSortType(e.target.value);
  };

  return (
    <div className="list">
      {sortedItems.length > 0 ? (
        <ul>
          {sortedItems.map((item) => (
            <PackingItems
              key={item.id}
              item={item}
              onDeleteItem={onDeleteItem}
              onToggleItem={onToggleItem}
            />
          ))}
        </ul>
      ) : (
        <p>There's no item at all</p>
      )}
      <div className="actions">
        <select
          name="sort"
          id="sort"
          onChange={changeSortTypeHandler}
          value={sortType}
        >
          <option value="inputOrder">SORT BY INPUT ORDER</option>
          <option value="description">SORT BY DESSCRIPTION</option>
          <option value="packedStatus">SORT BY PACKED STATUS</option>
        </select>
        <button onClick={onClearList}>CLEAR LIST</button>
      </div>
    </div>
  );
};

export default PackingList;
