import { useState } from "react";
import Button from "./Button";
import Message from "./Message";
const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

const App = function () {
  const [steps, setSteps] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const nextHandler = function () {
    if (steps === messages.length - 1) {
      return;
    }
    setSteps((preNum) => preNum + 1);
  };
  const previousHandler = function () {
    if (steps === 0) {
      return;
    }
    setSteps((preNum) => preNum - 1);
  };

  const closeHandler = function () {
    setIsOpen((open) => !open);
  };
  return (
    <>
      <button className="close" onClick={closeHandler}>
        X
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={`${steps >= 0 && `active`}`}>1</div>
            <div className={`${steps >= 1 && `active`}`}>2</div>
            <div className={`${steps >= 2 && `active`}`}>3</div>
          </div>
          <Message steps={steps}>{messages[steps]}</Message>

          <div className="buttons">
            <Button
              className={steps === 0 ? "inactive" : "active"}
              onClick={previousHandler}
              disabled={steps === 0}
            >
              Previous
            </Button>
            <Button
              className={steps === messages.length - 1 ? "inactive" : "active"}
              onClick={nextHandler}
              disabled={steps === messages.length - 1}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
