import * as yup from "yup";

const MAX_INPUT_VALUE = 1_000_000;
const MIN_INPUT_VALUE = -1_000_000;

let schema = yup.object().shape({
  arraySize: yup
    .number()
    .required()
    .integer()
    .min(1)
    .max(MAX_INPUT_VALUE)
    .test(
      "size <= hi - lo + 1 when sampling without repetition",
      "The array size must not be greater than the length of the allowed range",
      function (value) {
        const { minimumValue, maximumValue, allowRepeated } = this.parent;
        if (!allowRepeated) {
          return value <= maximumValue - minimumValue + 1;
        }
        return true;
      }
    ),
  minimumValue: yup
    .number()
    .required()
    .integer()
    .min(MIN_INPUT_VALUE)
    .max(MAX_INPUT_VALUE)
    .test(
      "minimumValue <= maximumValue",
      "The minimum value must not be greater than the maximum value.",
      function (value) {
        const { maximumValue } = this.parent;
        return value <= maximumValue;
      }
    ),
  maximumValue: yup
    .number()
    .required()
    .integer()
    .min(MIN_INPUT_VALUE)
    .max(MAX_INPUT_VALUE),
  allowRepeated: yup.boolean(),
});

export default schema;
