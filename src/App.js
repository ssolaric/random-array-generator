import "bulma/css/bulma.css";

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
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-half">
          <h1 className="title">Random Array Generator</h1>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <label htmlFor="array-size" class="label">
                Array size
              </label>
              <div className="control">
                <input
                  ref={register}
                  type="number"
                  name="arraySize"
                  id="array-size"
                  className="input"
                />
              </div>
              <p className="has-text-danger">{errors.arraySize?.message}</p>
            </div>
            <div className="field">
              <label htmlFor="minimum-value" class="label">
                Minimum value
              </label>
              <div className="control">
                <input
                  ref={register}
                  type="number"
                  name="minimumValue"
                  id="minimum-value"
                  className="input"
                />
              </div>
              <p className="has-text-danger">{errors.minimumValue?.message}</p>
            </div>
            <div className="field">
              <label htmlFor="maximum-value" class="label">
                Maximum value
              </label>
              <div className="control">
                <input
                  ref={register}
                  type="number"
                  name="maximumValue"
                  id="maximum-value"
                  className="input"
                />
              </div>
              <p className="has-text-danger">{errors.maximumValue?.message}</p>
            </div>
            <div className="field">
              <label htmlFor="allow-repeated" class="label">
                Allow repeated elements?
              </label>
              <input
                ref={register}
                type="checkbox"
                name="allowRepeated"
                id="allow-repeated"
                className="checkbox"
              />
              <p className="has-text-danger">{errors.allowRepeated?.message}</p>
            </div>

            <div className="control">
              <button type="submit" className="button is-primary">
                Submit
              </button>
            </div>
          </form>

          <div className="field">
            <label htmlFor="plain-text">Plain text</label>
            <div className="control">
              <textarea
                id="plain-text"
                value={outputPlainText}
                readOnly
                class="textarea"
              ></textarea>
            </div>
          </div>

          <div className="field">
            <label htmlFor="curly-brackets">Curly brackets (C++ style)</label>
            <div className="control">
              <textarea
                value={outputCurlyBrackets}
                readOnly
                class="textarea"
              ></textarea>
            </div>
          </div>

          <div className="field">
            <label htmlFor="square-brackets">
              Square brackets (JS/Python style)
            </label>
            <div className="control">
              <textarea
                value={outputSquareBrackets}
                readOnly
                class="textarea"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
