import Button from "../UI/Button";

const FriendItem = function ({ friend, onSelect }) {
  const { id, name, image, balance } = friend;
  let statement = `You and ${name} are even`;
  let className = "";
  if (balance < 0) {
    statement = `You owe ${name} ${Math.abs(balance)}$`;
    className = "red";
  }
  if (balance > 0) {
    statement = `${name} owe you ${Math.abs(balance)}$`;
    className = "green";
  }

  const selectFriendHandler = function () {
    onSelect(id);
  };
  return (
    <li>
      <img src={image} alt={`Image of ${name}`} />
      <h3>{name}</h3>
      <p className={className}>{statement}</p>
      <Button onClick={selectFriendHandler}>Select</Button>
    </li>
  );
};

export default FriendItem;
