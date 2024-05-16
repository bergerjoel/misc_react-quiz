export function ScoreScreen({
  totalQuestions,
  score,
  reset,
}: {
  totalQuestions: number;
  score: number;
  reset: () => void;
}) {
  const numberOfWrongAnswer = totalQuestions - score;
  const allCorrect = score === totalQuestions;
  return (
    <>
      {allCorrect ? (
        <h2>Congratulations, you got everything right!</h2>
      ) : (
        <h2>
          Your Score: {score}, you got {numberOfWrongAnswer} question(s) wrong.
        </h2>
      )}

      <button onClick={reset}>Try Again</button>
    </>
  );
}
