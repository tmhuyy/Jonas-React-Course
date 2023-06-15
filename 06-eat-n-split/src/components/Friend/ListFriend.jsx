import { useState } from "react";
import FriendItem from "./FriendItem";
import Button from "../UI/Button";
const ListFriend = function ({ friends, onAddFriend, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [friendName, setFriendName] = useState("");
  const [friendImage, setFriendImage] = useState("https://i.pravatar.cc/48");
  const openFormHandler = function () {
    setIsOpen((open) => !open);
  };

  const validateFriendName = function (name) {
    if (name.trim().length >= 3) return true;
    return false;
  };

  const clearInput = function () {
    setFriendName("");
    setIsOpen(false);
  };
  const addFriendHandler = function (e) {
    e.preventDefault();
    const id = Date.now() + "";
    if (!validateFriendName(friendName)) {
      alert("Please enter the valid friend name (length >= 3)");
      return;
    }
    const newFriend = {
      id: +id.slice(0, 6),
      name: friendName,
      image: `${friendImage}?u=${id.slice(0, 6)}`,
      balance: 0,
    };
    onAddFriend(newFriend);
    clearInput();
  };

  return (
    <div className="sidebar">
      <ul>
        {friends.map((friend) => (
          <FriendItem key={friend.id} friend={friend} onSelect={onSelect} />
        ))}
      </ul>
      {isOpen && (
        <form className="form-add-friend" onSubmit={addFriendHandler}>
          <label htmlFor="">👯‍♂️Friend name</label>
          <input
            type="text"
            value={friendName}
            onChange={(e) => setFriendName(e.target.value)}
          />
          <label htmlFor="">🌠Image URL</label>
          <input
            type="text"
            value={friendImage}
            onChange={(e) => setFriendImage(e.target.value)}
          />
          <Button>Add</Button>
        </form>
      )}
      <Button onClick={openFormHandler}>
        {isOpen ? "Close" : "Add Friend"}
      </Button>
    </div>
  );
};

export default ListFriend;
