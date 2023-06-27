const FinishScreen = function ({
  currentPoints,
  totalPoints,
  dispatch,
  highPoints,
}) {
  const percentage = (currentPoints / totalPoints) * 100;
  const restartQuestionHandler = function () {
    dispatch({
      type: "RESTART_QUESTION",
    });
  };

  return (
    <>
      <div className="result">
        <span>
          You scored {currentPoints} out of {totalPoints} points (
          {Math.ceil(percentage)}%)
        </span>
      </div>
      <div className="highscore">(Highscore: {highPoints} points)</div>
      <button className="btn btn-ui" onClick={restartQuestionHandler}>
        Restart Quiz
      </button>
    </>
  );
};

export default FinishScreen;
