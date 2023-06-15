import { useState } from "react";
import ListFriend from "./components/Friend/ListFriend";
import SplitBill from "./components/SplitBill/SplitBill";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [friends, setFriends] = useState([...initialFriends]);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const addFriendHandler = function (enteredFriend) {
    setFriends((preFriends) => [...preFriends, enteredFriend]);
  };

  const selectHandler = function (enteredId) {
    setIsSelected(true);
    const [friend] = friends.filter((friend) => friend.id === enteredId);
    setSelectedFriend(friend);
  };

  const splitHandler = function (enteredId, balance) {
    setFriends((pre) =>
      pre.map((friend) => {
        return friend.id === enteredId
          ? { ...friend, balance: friend.balance + balance }
          : friend;
      })
    );
    setIsSelected((open) => !open);
  };
  return (
    <div className="app">
      <ListFriend
        friends={friends}
        onAddFriend={addFriendHandler}
        onSelect={selectHandler}
      />
      {isSelected && (
        <SplitBill onSplit={splitHandler} selectedFriend={selectedFriend} />
      )}
    </div>
  );
}

export default App;
