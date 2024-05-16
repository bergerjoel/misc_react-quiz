import { useState } from "react";
import { ScoreScreen } from "./components/ScoreScreen";
import "./App.css";

// Initiate Type of Answer and Question

type Answer = {
  answer: string;
  correct: boolean;
};

type Question = {
  prompt: string;
  answers: Answer[];
};

// Declare Pairs of Questions and Answers;

const questions: Question[] = [
  {
    prompt: "What color is the sky?",
    answers: [
      { answer: "blue", correct: true },
      { answer: "green", correct: false },
      { answer: "yellow", correct: false },
      { answer: "red", correct: false },
    ],
  },
  {
    prompt: "What color is the earth?",
    answers: [
      { answer: "blue", correct: false },
      { answer: "magenta", correct: false },
      { answer: "brown", correct: true },
      { answer: "yellow", correct: false },
    ],
  },
  {
    prompt: "What color is my hair?",
    answers: [
      { answer: "blonde", correct: false },
      { answer: "green", correct: false },
      { answer: "light brown", correct: false },
      { answer: "black", correct: true },
    ],
  },
];

// Shuffle the answers within each question
questions.forEach((question) => {
  question.answers.sort(() => Math.random() - 0.5);
});

//Function App()_________________________

function App() {
  // Necessary const values
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const isGameOver = currentQuestionIndex >= questions.length;
  const currentQuestion = questions[currentQuestionIndex];

  // Function to find the correct answer
  function findCorrectAnswer(currentQuestion: Question): string | undefined {
    return currentQuestion.answers.find((answer) => answer.correct)?.answer;
  }
  // Handle answer selection
  const handleAnswerSelection = (answer: string) => {
    setSelectedAnswer(answer);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Necessary for HTML "Form" element;

    // Find the correct answer of the current question;
    const correctAnswer = findCorrectAnswer(currentQuestion);

    // Did the user get the right answer?
    if (selectedAnswer === correctAnswer) {
      setScore(score + 1);
    }

    // Increment to the next question;
    setCurrentQuestionIndex(currentQuestionIndex + 1);

    // Clear selected answer checkmark for the next question;
    setSelectedAnswer("");
  };

  // Function Quiz()_________________________

  // Initialize Quis for the instance that the game is NOT yet over;
  function Quiz() {
    return (
      <>
        <h1>{currentQuestion.prompt}</h1>
        <form className="quiz-form" onSubmit={handleSubmit}>
          {currentQuestion.answers.map((answer, index: number) => (
            <label key={index}>
              <input
                className="input"
                type="radio"
                name="answer"
                value={answer.answer}
                checked={selectedAnswer === answer.answer}
                onChange={() => handleAnswerSelection(answer.answer)}
              />
              {answer.answer}
            </label>
          ))}
          <button type="submit">Submit</button>
        </form>
      </>
    );
  }

  // Define when to show either the ScoreScreen OR the Quiz;
  return (
    <div className="page">
      {isGameOver ? (
        <ScoreScreen // Imported from seperate file: that is why we have to reintroduce alot of values here (Score, questions.length, and what the reset Button does.)
          score={score}
          totalQuestions={questions.length}
          reset={() => {
            setCurrentQuestionIndex(0);
            setSelectedAnswer(""), setScore(0);
          }}
        />
      ) : (
        <Quiz />
      )}
    </div>
  );
}

export default App;
