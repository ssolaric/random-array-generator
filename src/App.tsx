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
    <div className="w-full flex items-center justify-center h-screen bg-green-50">
      {/* <div className="w-full sm:max-w-lg shadow-lg p-4 bg-white"> */}
      <div className="w-full md:max-w-xl shadow-lg p-8 bg-white">
        <h1 className="text-2xl font-bold text-center">Random Array Generator</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label label-text" htmlFor="arraySize">
              <span className="label-text">Array size</span>
            </label>
            <input
              className="input input-bordered input-primary"
              type="number"
              {...register("arraySize", { valueAsNumber: true })}
            />
            <p className="text-error">{errors.arraySize?.message}</p>
          </div>
          <div className="form-control">
            <label className="label label-text" htmlFor="minimumValue">
              Minimum value
            </label>
            <input
              className="input input-bordered input-primary"
              type="number"
              {...register("minimumValue", { valueAsNumber: true })}
            />
            <p className="text-error">{errors.minimumValue?.message}</p>
          </div>
          <div className="form-control">
            <label className="label label-text" htmlFor="maximumValue">
              Maximum value
            </label>
            <input
              className="input input-bordered input-primary"
              type="number"
              {...register("maximumValue", { valueAsNumber: true })}
            />
            <p className="text-error">{errors.maximumValue?.message}</p>
          </div>
          <div className="form-control">
            <label className="label label-text" htmlFor="allowRepeated">
              Allow repeated elements
              <input
                className="checkbox checkbox-primary"
                type="checkbox"
                {...register("allowRepeated")}
              />
            </label>
            <p className="text-error">{errors.allowRepeated?.message}</p>
          </div>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>

        {isValid && isSubmitSuccessful && (
          <div>
            <p>Plain text</p>
            <pre>{output}</pre>
            <button>Copy to clipboard</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
