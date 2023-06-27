const QuestionOption = function ({
  answer,
  option,
  dispatch,
  correctOption,
  enteredAnswer,
}) {
  const chooseAnswerHandler = function () {
    dispatch({ type: "CHOOSE_ANSWER", payload: answer });
  };

  const isDisabled = enteredAnswer === null ? false : true;
  return (
    <button
      className={`btn btn-option ${answer === enteredAnswer ? "answer" : " "} ${
        isDisabled ? (correctOption === answer ? "correct" : "wrong") : ""
      }`}
      onClick={chooseAnswerHandler}
      disabled={isDisabled}
    >
      {option}
    </button>
  );
};

export default QuestionOption;
