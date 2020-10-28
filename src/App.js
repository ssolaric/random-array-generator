import "./App.css";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import generateArray from "./generateArray";
import schema from "./schema";

function App() {
  const { register, errors, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

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
            ref={register}
            type="number"
            name="arraySize"
            id="array-size"
          />
        </label>
        {errors.arraySize?.message}
        <label>
          Minimum value
          <input
            ref={register}
            type="number"
            name="minimumValue"
            id="minimum-value"
          />
        </label>
        {errors.minimumValue?.message}
        <label>
          Maximum value
          <input
            ref={register}
            type="number"
            name="maximumValue"
            id="maximum-value"
          />
        </label>
        {errors.maximumValue?.message}
        <label>
          Allow repeated elements?
          <input
            ref={register}
            type="checkbox"
            name="allowRepeated"
            id="allow-repeated"
          />
        </label>
        {errors.allowRepeated?.message}
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
