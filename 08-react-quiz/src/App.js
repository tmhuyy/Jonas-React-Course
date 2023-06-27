import DateCounter from "./DateCounter";
import Error from "./components/Utils/Error";
import Loader from "./components/Utils/Loader";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import { useEffect } from "react";
import { useReducer } from "react";
import StartScreen from "./components/Main/StartScreen";
import Question from "./components/Main/Question";
import Progress from "./components/Main/Progress";
import FinishScreen from "./components/Main/FinishScreen";

const initialState = {
  questions: [],
  // loading error ready active finished
  status: "loading",
  currentQuestion: 0,
  points: 0,
  answer: null,
  highPoints: 0,
};

const reducer = function (state, action) {
  switch (action.type) {
    case "LOAD_INITAL_QUESTIONS_SUCCESS":
      return { ...state, questions: action.payload, status: "ready" };
    case "LOAD_INITAL_QUESTIONS_FAIL":
      return { ...state, status: "error" };
    case "START_QUESTION":
      return { ...state, status: "active" };
    case "RESTART_QUESTION":
      return {
        ...initialState,
        status: "ready",
        // restart and keep the fetched questions & highpoints
        questions: state.questions,
        highPoints: state.highPoints,
      };
    case "NEXT_QUESTION":
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        answer: null,
      };
    case "FINISH_QUESTION":
      return {
        ...state,
        status: "finished",
        highPoints:
          state.points > state.highPoints ? state.points : state.highPoints,
      };
    case "CHOOSE_ANSWER":
      const { correctOption, points } = state.questions[state.currentQuestion];
      return {
        ...state,
        answer: action.payload,
        points:
          correctOption === action.payload
            ? state.points + points
            : state.points,
      };
    default:
      throw new Error("Action unknown");
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const totalPoints = state.questions.reduce(
    (acc, question) => question.points + acc,
    0
  );
  console.log(state);
  useEffect(() => {
    const getQuestions = async function () {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({ type: "LOAD_INITAL_QUESTIONS_SUCCESS", payload: data });
      } catch (err) {
        console.log(err);
        // shutdown json-server -> catch error
        dispatch({ type: "LOAD_INITAL_QUESTIONS_FAIL" });
      }
    };
    getQuestions();
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {state.status === "loading" && <Loader />}
        {state.status === "error" && <Error />}
        {state.status === "ready" && (
          <StartScreen
            numberQuestions={state.questions.length}
            dispatch={dispatch}
          />
        )}
        {state.status === "active" && (
          <>
            <Progress
              totalPoints={totalPoints}
              currentPoint={state.points}
              currentQuestion={state.currentQuestion}
              totalQuestions={state.questions.length}
              answer={state.answer}
            />
            <Question
              dispatch={dispatch}
              question={state.questions[state.currentQuestion]}
              enteredAnswer={state.answer}
              currentQuestion={state.currentQuestion + 1}
              numberQuestions={state.questions.length}
            />
          </>
        )}
        {state.status === "finished" && (
          <FinishScreen
            currentPoints={state.points}
            totalPoints={totalPoints}
            dispatch={dispatch}
            highPoints={state.highPoints}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
