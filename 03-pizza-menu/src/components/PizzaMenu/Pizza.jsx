const Pizza = function ({ pizza }) {
  const { name, ingredients, price, photoName, soldOut } = pizza;
  // other return if soldOut => return null
  // if (soldOut) return null;
  return (
    <li className={`pizza ${soldOut && "sold-out"}`}>
      <img src={photoName} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>{ingredients}</p>
        <span>{soldOut ? "Sold Out" : price}</span>
      </div>
    </li>
  );
};
export default Pizza;
