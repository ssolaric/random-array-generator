import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
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
    <Container component="main" maxWidth="sm">
      <Typography component="h1" variant="h4" align="center">
        Random Array Generator
      </Typography>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          inputRef={register}
          id="array-size"
          name="arraySize"
          label="Array size"
          type="number"
        />
        <Typography component="p" color="error">
          {errors.arraySize?.message}
        </Typography>

        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          inputRef={register}
          id="minimum-value"
          name="minimumValue"
          label="Minimum value"
          type="number"
        />
        <Typography component="p" color="error">
          {errors.minimumValue?.message}
        </Typography>

        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          inputRef={register}
          id="maximum-value"
          name="maximumValue"
          label="Maximum value"
          type="number"
        />
        <Typography component="p" color="error">
          {errors.maximumValue?.message}
        </Typography>

        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              inputRef={register}
              id="allow-repeated"
              name="allowRepeated"
            />
          }
          label="Allow repeated elements"
        />
        <Typography component="p" color="error">
          {errors.allowRepeated?.message}
        </Typography>

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>

      <Box p={5}>
        <Typography component="p">
          Plain text
        </Typography>
        <Box component="pre" overflow="scroll" p={1} fontSize={18}>
          <Box component="code">{outputPlainText}</Box>
        </Box>
  
        <Typography component="p">
          Curly brackets (C++ style)
        </Typography>
        <Box component="pre" overflow="scroll" p={1} fontSize={18}>
          <Box component="code">{outputCurlyBrackets}</Box>
        </Box>
  
        <Typography component="p">
          Square brackets (JS/Python style)
        </Typography>
        <Box component="pre" overflow="scroll" p={1} fontSize={18}>
          <Box component="code">{outputSquareBrackets}</Box>
        </Box>
      </Box>
    </Container>
  );
}

export default App;
