export function handleImageClick(
  e,
  hintIndex,
  subQuestionIndex,
  thiQuestionIndex,
  setDataModal,
  setShowModal,
  toggleThisQuestion,
  actualOpened,
  setActualOpened,
  setHints,
  isImageClick
) {
  const clickedElement = e.target;
  const isImage =
    clickedElement.tagName === "IMG" || clickedElement.closest("img");
  if (isImage) {
    const imageSrc =
      clickedElement.tagName === "IMG"
        ? clickedElement.getAttribute("src")
        : null;
    setDataModal({
      size: "large",
      type: "modal-image",
      onclose: setShowModal,
      content: `<figure class="modal-image-container"><img src="${imageSrc}" alt="modal image"></figure>`,
    });
    setShowModal(true);
  } else {
    toggleThisQuestion(
      hintIndex,
      subQuestionIndex,
      thiQuestionIndex,
      actualOpened,
      setActualOpened,
      setHints
    );
  }
}

export function toggleHint(index, setActualOpened, setHints) {
  setActualOpened(index);
  setHints((prevHints) =>
    prevHints.map((hint, i) => {
      if (i === index) {
        return { ...hint, open: !hint.open };
      } else {
        return { ...hint, open: false };
      }
    })
  );
}

export function toggleSubQuestion(
  hintIndex,
  subQuestionIndex,
  setActualOpened,
  setHints
) {
  setActualOpened(hintIndex);
  setHints((prevHints) => {
    return prevHints.map((hint, i) => {
      if (i === hintIndex) {
        return {
          ...hint,
          subQuestion: hint.subQuestion.map((subQuestion, j) => {
            if (j === subQuestionIndex) {
              return {
                ...subQuestion,
                open: !subQuestion.open,
              };
            } else {
              return {
                ...subQuestion,
                open: false,
              };
            }
          }),
        };
      } else {
        return {
          ...hint,
          subQuestion: hint.subQuestion.map((subQuestion) => {
            return {
              ...subQuestion,
              open: false,
            };
          }),
        };
      }
    });
  });
}

export function toggleThisQuestion(
  hintIndex,
  subQuestionIndex,
  thiQuestionIndex,
  actualOpened,
  setActualOpened,
  setHints
) {
  setActualOpened(hintIndex);
  setHints((prevHints) => {
    const hintToUpdate = prevHints[hintIndex];
    const subQuestionToUpdate = hintToUpdate.subQuestion[subQuestionIndex];
    return prevHints.map((hint, i) => {
      if (i === hintIndex) {
        return {
          ...hint,
          subQuestion: hint.subQuestion.map((subQuestion, j) => {
            if (j === subQuestionIndex) {
              return {
                ...subQuestion,
                thiQuestion: subQuestion.thiQuestion?.map((thiQuestion, k) => {
                  if (k === thiQuestionIndex) {
                    return {
                      ...thiQuestion,
                      open: !thiQuestion.open,
                    };
                  } else {
                    return thiQuestion;
                  }
                }),
              };
            } else {
              return subQuestion;
            }
          }),
        };
      } else {
        return hint;
      }
    });
  });
}
