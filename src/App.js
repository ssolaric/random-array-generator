import "./App.css";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import generateArray from "./generateArray";

const MAX_INPUT_VALUE = 1_000_000;
const MIN_INPUT_VALUE = -1_000_000;

function App() {
  const { register, handleSubmit } = useForm();

  const [outputPlainText, setOutputPlainText] = useState("");
  const [outputCurlyBrackets, setOutputCurlyBrackets] = useState("");
  const [outputSquareBrackets, setOutputSquareBrackets] = useState("");

  const onSubmit = (data) => {
    const array = generateArray(data);
    const resultPlainText = `${array.length}\n${array.join(" ")}`;
    const resultCurlyBrackets = `{${array.join(", ")}}`;
    const resultSquareBrackets = `[${array.join(", ")}]`;
    setOutputPlainText(resultPlainText);
    setOutputCurlyBrackets(resultCurlyBrackets);
    setOutputSquareBrackets(resultSquareBrackets);
  };

  return (
    <div>
      <h1>Random Array Generator</h1>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <label>
          Array size
          <input
            ref={register({ required: true, min: 1, max: MAX_INPUT_VALUE })}
            type="number"
            name="arraySize"
            id="array-size"
          />
        </label>
        <label>
          Minimum value
          <input
            ref={register({
              required: true,
              min: MIN_INPUT_VALUE,
              max: MAX_INPUT_VALUE,
            })}
            type="number"
            name="minimumValue"
            id="minimum-value"
          />
        </label>
        <label>
          Maximum value
          <input
            ref={register({
              required: true,
              min: MIN_INPUT_VALUE,
              max: MAX_INPUT_VALUE,
            })}
            type="number"
            name="maximumValue"
            id="maximum-value"
          />
        </label>
        <label>
          Allow repeated elements?
          <input
            ref={register}
            type="checkbox"
            name="allowRepeated"
            id="allow-repeated"
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      <label>
        Plain text
        <textarea
          value={outputPlainText}
          readOnly
          rows="5"
          cols="80"
        ></textarea>
      </label>

      <label>
        Curly brackets (C++ style)
        <textarea
          value={outputCurlyBrackets}
          readOnly
          rows="5"
          cols="80"
        ></textarea>
      </label>

      <label>
        Square brackets (JS/Python style)
        <textarea
          value={outputSquareBrackets}
          readOnly
          rows="5"
          cols="80"
        ></textarea>
      </label>
    </div>
  );
}

export default App;
