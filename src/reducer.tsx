export type AppState = {
  output: {
    plainText: string;
    curlyBrackets: string;
    squareBrackets: string;
  };
  copied: {
    plainText: boolean;
    curlyBrackets: boolean;
    squareBrackets: boolean;
  };
};

type SubmitAction = {
  type: "submit";
  outputPlainText: string;
  outputCurlyBrackets: string;
  outputSquareBrackets: string;
};

type CopyAction = {
  type: "copy_plain_text" | "copy_curly_brackets" | "copy_square_brackets";
};

export type AppAction = SubmitAction | CopyAction;

export function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "submit":
      return {
        output: {
          plainText: action.outputPlainText,
          curlyBrackets: action.outputCurlyBrackets,
          squareBrackets: action.outputSquareBrackets,
        },
        copied: {
          plainText: false,
          curlyBrackets: false,
          squareBrackets: false,
        },
      };
    case "copy_plain_text":
      return {
        output: { ...state.output },
        copied: {
          plainText: true,
          curlyBrackets: false,
          squareBrackets: false,
        },
      };
    case "copy_curly_brackets":
      return {
        output: { ...state.output },
        copied: {
          plainText: false,
          curlyBrackets: true,
          squareBrackets: false,
        },
      };
    case "copy_square_brackets":
      return {
        output: { ...state.output },
        copied: {
          plainText: false,
          curlyBrackets: false,
          squareBrackets: true,
        },
      };
    default:
      throw Error("Invalid action.");
  }
}
