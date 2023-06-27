const Progress = function ({
  currentQuestion,
  totalQuestions,
  currentPoint,
  totalPoints,
  answer,
}) {
  return (
    <div className="progress">
      {/* Number(true/false) -> 1 / 0 */}
      {/* first render 0 -> after selecting answer, => 
      now answer index will be added => re-render => 
      update progress bar*/}
      <progress
        max={totalQuestions}
        value={currentQuestion + Number(answer !== null)}
      />
      <p>
        Question <b>{currentQuestion + 1}</b> / {totalQuestions}
      </p>
      <p>
        <b>{currentPoint}</b> / {totalPoints} points
      </p>
    </div>
  );
};

export default Progress;
