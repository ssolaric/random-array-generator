import { number } from "yup";
import { z } from "zod";
// import * as yup from "yup";
const MAX_INPUT_VALUE = 1_000_000;
const MIN_INPUT_VALUE = -1_000_000;

const schema = z
  .object({
    arraySize: z.number().int().min(1).max(MAX_INPUT_VALUE),
    minimumValue: z.number().int().min(MIN_INPUT_VALUE).max(MAX_INPUT_VALUE),
    maximumValue: z.number().int().min(MIN_INPUT_VALUE).max(MAX_INPUT_VALUE),
    allowRepeated: z.boolean(),
  })
  .superRefine((val, ctx) => {
    const { arraySize, minimumValue, maximumValue, allowRepeated } = val;
    const allowedRangeLength = maximumValue - minimumValue + 1;
    if (minimumValue > maximumValue) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_big,
        maximum: maximumValue,
        type: "number",
        inclusive: true,
        message:
          "The minimum value must not be greater than the maximum value.",
      });
    }
    if (!allowRepeated && arraySize > allowedRangeLength) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_big,
        maximum: allowedRangeLength,
        type: "number",
        inclusive: true,
        message:
          "The array size must not be greater than the length of the allowed range",
      });
    }
  });

// let schema = yup.object().shape({
//   arraySize: yup
//     .number()
//     .required()
//     .integer()
//     .min(1)
//     .max(MAX_INPUT_VALUE)
//     .test(
//       "size <= hi - lo + 1 when sampling without repetition",
//       "The array size must not be greater than the length of the allowed range",
//       (value, context) => {
//         const { minimumValue, maximumValue, allowRepeated } = context.parent;
//         if (!allowRepeated) {
//           return value <= maximumValue - minimumValue + 1;
//         }
//         return true;
//       }
//     ),
//   minimumValue: yup
//     .number()
//     .required()
//     .integer()
//     .min(MIN_INPUT_VALUE)
//     .max(MAX_INPUT_VALUE)
//     .test(
//       "minimumValue <= maximumValue",
//       "The minimum value must not be greater than the maximum value.",
//       function (value: number) {
//         const { maximumValue } = this.parent;
//         return value <= maximumValue;
//       }
//     ),
//   maximumValue: yup
//     .number()
//     .required()
//     .integer()
//     .min(MIN_INPUT_VALUE)
//     .max(MAX_INPUT_VALUE),
//   allowRepeated: yup.boolean(),
// });

type FormInput = z.infer<typeof schema>;

export type { FormInput };
export { schema };
