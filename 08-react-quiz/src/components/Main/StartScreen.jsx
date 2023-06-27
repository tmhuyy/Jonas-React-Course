const StartScreen = function ({ numberQuestions, dispatch }) {
  const startQuestionHandler = function () {
    dispatch({ type: "START_QUESTION" });
  };
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>
        {numberQuestions} question{numberQuestions > 1 ? "s" : ""} to test your
        React mastery
      </h3>
      <button className="btn btn-ui" onClick={startQuestionHandler}>
        Let's start
      </button>
    </div>
  );
};

export default StartScreen;
