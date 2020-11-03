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
        <label htmlFor="array-size">Array size</label>

        <input ref={register} type="number" name="arraySize" id="array-size" />
        <p>{errors.arraySize?.message}</p>

        <label htmlFor="minimum-value">Minimum value</label>

        <input
          ref={register}
          type="number"
          name="minimumValue"
          id="minimum-value"
        />
        <p>{errors.minimumValue?.message}</p>

        <label htmlFor="maximum-value">Maximum value</label>

        <input
          ref={register}
          type="number"
          name="maximumValue"
          id="maximum-value"
        />
        <p>{errors.maximumValue?.message}</p>

        <label htmlFor="allow-repeated">Allow repeated elements?</label>
        <input
          ref={register}
          type="checkbox"
          name="allowRepeated"
          id="allow-repeated"
        />
        <p>{errors.allowRepeated?.message}</p>

        <button type="submit">Submit</button>
      </form>

      <p>Plain text</p>
      <pre>
        <code>{outputPlainText}</code>
      </pre>

      <p>Curly brackets (C++ style)</p>
      <pre>
        <code>{outputCurlyBrackets}</code>
      </pre>

      <p>Square brackets (JS/Python style)</p>
      <pre>
        <code>{outputSquareBrackets}</code>
      </pre>
    </div>
  );
}

export default App;
