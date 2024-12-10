import Quiz from "./components/Quiz.jsx";
import QuizContextProvider from "./contexts/QuizContextProvider.jsx";

function App() {
  return (
    <main>
      <QuizContextProvider>
        <Quiz />
      </QuizContextProvider>
    </main>
  );
}

export default App;
