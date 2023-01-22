import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import generateArray from "./generateArray";
import schema from "./schema";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [output, setOutput] = useState("");

  const onSubmit = (data) => {
    const array = generateArray(data);
    const resultPlainText = `${array.length}\n${array.join(" ")}`;
    setOutput(resultPlainText);
  };
  return (
    <div>
      <h1>Hello world</h1>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <label>
          Array size
          <input type="number" {...register("arraySize")} />
        </label>
        <p>{errors.arraySize?.message}</p>
        <label>
          Minimum value
          <input type="number" {...register("minimumValue")} />
        </label>
        <p>{errors.minimumValue?.message}</p>
        <label>
          Maximum value
          <input type="number" {...register("maximumValue")} />
        </label>
        <p>{errors.maximumValue?.message}</p>
        <label>
          Allow repeated elements
          <input type="checkbox" {...register("allowRepeated")} />
        </label>
        <p>{errors.allowRepeated?.message}</p>
        <button type="submit">Submit</button>
      </form>

      {isValid && isSubmitSuccessful && (
        <div>
          <p>Plain text</p>
          <pre>{output}</pre>
          <button>Copy to clipboard</button>
        </div>
      )}
    </div>
  );
}

export default App;
