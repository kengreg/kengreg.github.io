export function createHintObject({ title, subQuestions, open = false }) {
  return {
    title,
    open,
    subQuestion: subQuestions.map((subQuestion) =>
      createSubQuestionObject(subQuestion)
    ),
  };
}

export function createSubQuestionObject({ title, thiQuestions, open = false }) {
  return {
    title,
    open,
    thiQuestion: thiQuestions.map(({ answer, open = false }) =>
      createThiQuestionObject(answer, open)
    ),
  };
}

export function createThiQuestionObject(answer, open = false) {
  return {
    answer,
    open,
  };
}
