import { useEffect } from "react";
const SECOND_PER_MINUTE = 60;

const Timer = function ({ secondsRemaining, dispatch }) {
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "REMOVE_ONE_SECOND" });
    }, 1000);
    //   setInterval returns the unique id
    return () => {
      clearInterval(id);
    };
  }, [dispatch, secondsRemaining]);
  const time = Math.trunc(secondsRemaining / SECOND_PER_MINUTE);
  const second = secondsRemaining % SECOND_PER_MINUTE;
  return (
    <div className="timer">
      {`${time < 10 ? `0` : ""}`}
      {time}:{`${second < 10 ? `0` : ""}`}
      {second}
    </div>
  );
};

export default Timer;
