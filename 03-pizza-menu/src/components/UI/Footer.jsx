const Footer = function () {
  const hour = new Date().getHours();
  const closeHour = 22;
  const statement =
    hour < closeHour
      ? `We're open until ${closeHour}:00. Come visit us or order online.`
      : "We're currently close";
  return (
    <footer className="footer">
      <div className="order">
        <p>{statement}</p>
        <button className="btn">Order</button>
      </div>
    </footer>
  );
};

export default Footer;
