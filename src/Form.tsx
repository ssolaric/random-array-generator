import React from "react";
import { FieldErrorsImpl, UseFormRegister } from "react-hook-form";
import { FormInput } from "./schema";

type FormProps = {
  register: UseFormRegister<FormInput>;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  errors: Partial<FieldErrorsImpl<FormInput>>;
};

function Form({ register, handleSubmit, errors }: FormProps) {
  return (
    <form onSubmit={handleSubmit}>
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
  );
}

export default Form;
