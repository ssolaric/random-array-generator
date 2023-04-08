import React, { useReducer } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import generateArray from "./generateArray";
import { schema, FormInput } from "./schema";
import Form from "./Form";
import OutputBoxes from "./OutputBoxes";
import { reducer } from "./reducer";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isValid },
  } = useForm<FormInput>({
    resolver: zodResolver(schema),
  });

  const [state, dispatch] = useReducer(reducer, {
    output: {
      plainText: "",
      curlyBrackets: "",
      squareBrackets: "",
    },
    copied: {
      plainText: false,
      curlyBrackets: false,
      squareBrackets: false,
    },
  });

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    const array = generateArray(data);
    const resultPlainText = `${array.length}\n${array.join(" ")}`;
    const resultCurlyBrackets = `{${array.join(", ")}}`;
    const resultSquareBrackets = `[${array.join(", ")}]`;
    dispatch({
      type: "submit",
      outputPlainText: resultPlainText,
      outputCurlyBrackets: resultCurlyBrackets,
      outputSquareBrackets: resultSquareBrackets,
    });
  };

  const handleCopy = {
    plainText() {
      dispatch({
        type: "copy_plain_text",
      });
    },
    curlyBrackets() {
      dispatch({
        type: "copy_curly_brackets",
      });
    },
    squareBrackets() {
      dispatch({
        type: "copy_square_brackets",
      });
    },
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-green-50">
      <div className="w-full md:max-w-xl shadow-lg p-8 bg-white">
        <h1 className="text-2xl font-bold text-center">
          Random Array Generator
        </h1>
        <Form
          register={register}
          handleSubmit={handleSubmit(onSubmit)}
          errors={errors}
        />
        <OutputBoxes
          isValid={isValid}
          isSubmitSuccessful={isSubmitSuccessful}
          state={state}
          handleCopy={handleCopy}
        />
      </div>
    </div>
  );
}

export default App;
