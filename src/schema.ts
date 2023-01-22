import { z } from "zod";
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
        path: ["minimumValue"],
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
        path: ["arraySize"],
        message:
          "The array size must not be greater than the length of the allowed range",
      });
    }
  });

type FormInput = z.infer<typeof schema>;

export type { FormInput };
export { schema };
