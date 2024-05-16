/**
 * @jest-environment jsdom
 */

import { test } from "@jest/globals";
import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";

// Importing the function
import { ScoreScreen } from "../components/ScoreScreen";

// Info: Tests all use different values for the function, so all the tests are rather long in structure;

// Test 1; Message on win?
describe("ScoreScreen component", () => {
  test("renders congratulatory message when all answers are correct", () => {
    const totalQuestions = 5;
    const score = 5;
    const reset = jest.fn();

    const { getByText } = render(
      <ScoreScreen
        totalQuestions={totalQuestions}
        score={score}
        reset={reset}
      />
    );
    const congratulatoryMessage: HTMLElement = getByText(
      /Congratulations, you got everything right!/i
    );

    expect(congratulatoryMessage).toBeInTheDocument();
  });

  // Test 2; Reset working?
  test.skip('calls reset function when "Try Again" button is clicked', () => {
    const totalQuestions = 0;
    const score = 0;
    const reset = jest.fn();

    const { getByText } = render(
      <ScoreScreen
        totalQuestions={totalQuestions}
        score={score}
        reset={reset}
      />
    );
    const tryAgainButton: HTMLElement = getByText(/Try Again/i);
    fireEvent.click(tryAgainButton);

    expect(reset).toHaveBeenCalledTimes(1); // Reset function should be called once
  });
});
