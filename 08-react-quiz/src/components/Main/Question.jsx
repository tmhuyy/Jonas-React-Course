import QuestionOption from "./QuestionOption";

const Question = function ({
  question,
  dispatch,
  enteredAnswer,
  currentQuestion,
  numberQuestions,
}) {
  const nextQuestionHandler = function () {
    // THE LAST QUESTION => FINISH SCREEN
    if (currentQuestion === numberQuestions) {
      dispatch({ type: "FINISH_QUESTION" });
      return;
    }
    // NEXT QUESTION
    dispatch({ type: "NEXT_QUESTION" });
  };
  console.log(enteredAnswer);
  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, index) => {
          return (
            <QuestionOption
              key={index}
              correctOption={question.correctOption}
              option={option}
              answer={index}
              dispatch={dispatch}
              enteredAnswer={enteredAnswer}
            />
          );
        })}
      </div>
      {enteredAnswer !== null && (
        <button className="btn btn-ui" onClick={nextQuestionHandler}>
          {currentQuestion === numberQuestions ? "Finish" : "Next"}
        </button>
      )}
    </div>
  );
};

export default Question;
