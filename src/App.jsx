import Quiz from "./components/Quiz.jsx";
import QuizContextProvider from "./contexts/QuizContextProvider.jsx";

function App() {
  return (
    <QuizContextProvider>
      <Quiz />
    </QuizContextProvider>
  );
}

export default App;
