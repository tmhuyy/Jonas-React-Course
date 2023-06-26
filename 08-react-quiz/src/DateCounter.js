import { useState, useReducer } from "react";

// template useReducer
// const initialState = {}
// const reducer = function (preState, action) {
//    switch case sth
// }
// const [curState, dispatch] = useReducer(reducer, initilState)
// dispatch(action) -> action = {type: ...., payload: .....}
const initialState = {
  count: 0,
  step: 1,
};

const reducer = function (preState, action) {
  switch (action.type) {
    case "INCREASE_DATE":
      return { ...preState, count: preState.count + preState.step };
    case "DECREASE_DATE":
      return { ...preState, count: preState.count - preState.step };
    case "DEFINE_STEP":
      return { ...preState, step: action.payload };
    case "DEFINE_Count":
      return { ...preState, count: action.payload };
    case "RESET":
      return { count: 0, step: 1 };
    default:
      return { ...preState };
  }
};

function DateCounter() {
  // const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1);

  const [curState, dispatch] = useReducer(reducer, initialState);
  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + curState.count);

  const dec = function () {
    // setCount((count) => count - 1);
    dispatch({ type: "DECREASE_DATE" });
    // setCount((count) => count - step);
  };

  const inc = function () {
    // setCount((count) => count + 1);

    dispatch({ type: "INCREASE_DATE" });

    // setCount((count) => count + step);
  };

  const defineCount = function (e) {
    dispatch({ type: "DEFINE_COUNT", payload: +e.target.value });

    // setCount(Number(e.target.value));
  };

  const defineStep = function (e) {
    dispatch({ type: "DEFINE_STEP", payload: +e.target.value });

    // setStep(Number(e.target.value));
  };

  const reset = function () {
    dispatch({ type: "RESET" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={curState.step}
          onChange={defineStep}
        />
        <span>{curState.step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={curState.count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
