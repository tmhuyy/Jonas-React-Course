const Status = function ({ items }) {
  const packedItems = items.filter((item) => item.packed).length;
  const remainItems = items.filter((item) => !item.packed).length;
  const totalItems = items.length;
  const percentage = Math.round((packedItems / totalItems) * 100);
  // for (let item of items) {
  //   if (item.packed) packedItems++;
  // }
  return (
    <p className="stats">
      {items.length === 0 ? (
        <em>Start adding some items to your packing list 🚀</em>
      ) : (
        <em>
          {percentage !== 100
            ? ` You have ${remainItems} item${
                remainItems > 1 ? "s" : ""
              } on your list, and
          you already packed ${packedItems} (
          ${percentage}%)`
            : `You got everything! Ready to go....`}
        </em>
      )}
    </p>
  );
};

export default Status;
