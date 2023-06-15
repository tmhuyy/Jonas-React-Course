import Pizza from "./Pizza";

const Menu = function ({ pizzaData }) {
  return (
    <main className="menu">
      <h2>Our menu</h2>

      {pizzaData.length > 0 ? (
        <>
          <p>
            Authentic Italian cuisine. {pizzaData.length} creative dishes to
            choose from. All from our stone oven, all organic, all delicious
          </p>
          <ul className="pizzas">
            {pizzaData.map((pizza, index) => {
              return <Pizza key={index} pizza={pizza} />;
            })}
          </ul>
        </>
      ) : (
        <p>There're no pizza in here</p>
      )}
    </main>
  );
};

export default Menu;
