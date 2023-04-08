import React from "react";
import OutputBox from "./OutputBox";
import { AppState } from "./reducer";

type OutputBoxesProps = {
  isValid: boolean;
  isSubmitSuccessful: boolean;
  state: AppState;
  handleCopy: {
    plainText: () => void;
    curlyBrackets: () => void;
    squareBrackets: () => void;
  };
};

function OutputBoxes({
  isValid,
  isSubmitSuccessful,
  state,
  handleCopy,
}: OutputBoxesProps) {
  if (isValid && isSubmitSuccessful) {
    return (
      <>
        <OutputBox
          title="Plain text"
          output={state.output.plainText}
          copied={state.copied.plainText}
          onCopy={handleCopy.plainText}
        />
        <OutputBox
          title="Curly brackets (C++ style)"
          output={state.output.curlyBrackets}
          copied={state.copied.curlyBrackets}
          onCopy={handleCopy.curlyBrackets}
        />
        <OutputBox
          title="Square brackets (JS/Python style)"
          output={state.output.squareBrackets}
          copied={state.copied.squareBrackets}
          onCopy={handleCopy.squareBrackets}
        />
      </>
    );
  }
  return null;
}

export default OutputBoxes;
