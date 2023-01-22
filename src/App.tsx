import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import generateArray from "./generateArray";
import { schema, FormInput } from "./schema";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isValid },
  } = useForm<FormInput>({
    resolver: zodResolver(schema),
  });

  const [output, setOutput] = useState("");

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    const array = generateArray(data);
    const resultPlainText = `${array.length}\n${array.join(" ")}`;
    setOutput(resultPlainText);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Array size
          <input
            type="number"
            {...register("arraySize", { valueAsNumber: true })}
          />
        </label>
        <p>{errors.arraySize?.message}</p>
        <label>
          Minimum value
          <input
            type="number"
            {...register("minimumValue", { valueAsNumber: true })}
          />
        </label>
        <p>{errors.minimumValue?.message}</p>
        <label>
          Maximum value
          <input
            type="number"
            {...register("maximumValue", { valueAsNumber: true })}
          />
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
