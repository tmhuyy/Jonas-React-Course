import { useState } from "react";
import Button from "../UI/Button";
const SplitBill = function ({ selectedFriend, onSplit }) {
  const [bill, setBill] = useState("");
  const [yourExpense, setYourExpense] = useState("");
  const [friendExpense, setFriendExpense] = useState("");
  const [whoPay, setWhoPay] = useState("You");

  const clearInput = function () {
    setBill("");
    setYourExpense("");
    setFriendExpense("");
    setWhoPay("You");
  };

  const splitBillHandler = function (e) {
    e.preventDefault();
    if (whoPay === "You") {
      //   console.log(selectedFriend.id, friendExpense);
      onSplit(selectedFriend.id, friendExpense);
      return;
    }
    if (whoPay === selectedFriend.name) {
      onSplit(selectedFriend.id, -yourExpense);
      return;
    }
    clearInput();
  };

  return (
    <form className="form-split-bill" onSubmit={splitBillHandler}>
      <h2>{`SPLIT A BILL WITH ${selectedFriend.name}`}</h2>
      <label htmlFor="">👯‍♂️Bill value</label>
      <input
        type="number"
        value={bill}
        onChange={(e) => {
          setBill(+e.target.value);
          setFriendExpense(+(e.target.value - yourExpense));
        }}
      />
      <label htmlFor="">👯‍♂️Your expense</label>
      <input
        type="text"
        value={yourExpense}
        onChange={(e) => {
          setYourExpense(+e.target.value);
          setFriendExpense(bill - +e.target.value);
        }}
      />
      <label htmlFor=""> {`👯‍♂️${selectedFriend.name}'s expense`}</label>
      <input
        type="text"
        disabled={true}
        value={friendExpense}
        onChange={(e) => {
          setFriendExpense(+e.target.value);
        }}
      />
      <label htmlFor="">👯‍♂️Who is paying the bill?</label>
      <select value={whoPay} onChange={(e) => setWhoPay(e.target.value)}>
        <option value="You">You</option>
        <option value={selectedFriend.name}>{selectedFriend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
};

export default SplitBill;
