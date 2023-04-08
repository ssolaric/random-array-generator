import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import generateArray from "./generateArray";
import { schema, FormInput } from "./schema";
import OutputBox from "./OutputBox";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isValid },
  } = useForm<FormInput>({
    resolver: zodResolver(schema),
  });

  // todo: refactorizar esto usando un reducer
  // puedo intentar tdd, o sea, hacer tests primero
  const [outputPlainText, setOutputPlainText] = useState("");
  const [outputCurlyBrackets, setOutputCurlyBrackets] = useState("");
  const [outputSquareBrackets, setOutputSquareBrackets] = useState("");
  const [copiedPlainText, setCopiedPlainText] = useState(false);
  const [copiedCurlyBrackets, setCopiedCurlyBrackets] = useState(false);
  const [copiedSquareBrackets, setCopiedSquareBrackets] = useState(false);

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    const array = generateArray(data);
    const resultPlainText = `${array.length}\n${array.join(" ")}`;
    const resultCurlyBrackets = `{${array.join(", ")}}`;
    const resultSquareBrackets = `[${array.join(", ")}]`;
    setOutputPlainText(resultPlainText);
    setOutputCurlyBrackets(resultCurlyBrackets);
    setOutputSquareBrackets(resultSquareBrackets);
    setCopiedPlainText(false);
    setCopiedCurlyBrackets(false);
    setCopiedSquareBrackets(false);
  };

  const handleCopyPlainText = () => {
    setCopiedPlainText(true);
    setCopiedCurlyBrackets(false);
    setCopiedSquareBrackets(false);
  };

  const handleCopyCurlyBrackets = () => {
    setCopiedPlainText(false);
    setCopiedCurlyBrackets(true);
    setCopiedSquareBrackets(false);
  };

  const handleCopySquareBrackets = () => {
    setCopiedPlainText(false);
    setCopiedCurlyBrackets(false);
    setCopiedSquareBrackets(true);
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-green-50">
      {/* <div className="w-full sm:max-w-lg shadow-lg p-4 bg-white"> */}
      <div className="w-full md:max-w-xl shadow-lg p-8 bg-white">
        <h1 className="text-2xl font-bold text-center">
          Random Array Generator
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control mb-4">
            <label className="label" htmlFor="arraySize">
              Array size
            </label>
            <input
              className="input input-bordered input-primary text-lg"
              type="number"
              {...register("arraySize", { valueAsNumber: true })}
            />
            <p className="text-error">{errors.arraySize?.message}</p>
          </div>
          <div className="form-control mb-4">
            <label className="label" htmlFor="minimumValue">
              Minimum value
            </label>
            <input
              className="input input-bordered input-primary text-lg"
              type="number"
              {...register("minimumValue", { valueAsNumber: true })}
            />
            <p className="text-error">{errors.minimumValue?.message}</p>
          </div>
          <div className="form-control mb-4">
            <label className="label" htmlFor="maximumValue">
              Maximum value
            </label>
            <input
              className="input input-bordered input-primary text-lg"
              type="number"
              {...register("maximumValue", { valueAsNumber: true })}
            />
            <p className="text-error">{errors.maximumValue?.message}</p>
          </div>
          <div className="form-control mb-2">
            <label className="label justify-start" htmlFor="allowRepeated">
              <input
                className="checkbox checkbox-primary mr-4"
                defaultChecked
                type="checkbox"
                {...register("allowRepeated")}
              />
              Allow repeated elements
            </label>
            <p className="text-error">{errors.allowRepeated?.message}</p>
          </div>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>

        {isValid && isSubmitSuccessful && (
          <>
            <OutputBox
              title="Plain text"
              output={outputPlainText}
              copied={copiedPlainText}
              onCopy={handleCopyPlainText}
            />
            <OutputBox
              title="Curly brackets (C++ style)"
              output={outputCurlyBrackets}
              copied={copiedCurlyBrackets}
              onCopy={handleCopyCurlyBrackets}
            />
            <OutputBox
              title="Square brackets (JS/Python style)"
              output={outputSquareBrackets}
              copied={copiedSquareBrackets}
              onCopy={handleCopySquareBrackets}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
