import { CopyToClipboard } from "react-copy-to-clipboard";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

function OutputBox({ title, output }) {
  if (!output) {
    return null;
  }
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography component="p">{title}</Typography>
        <Box component="pre" overflow="auto" p={1} fontSize={18}>
          <Box component="code">{output}</Box>
        </Box>
      </CardContent>
      <CardActions>
        <CopyToClipboard text={output}>
          <Button type="submit" variant="contained" color="secondary">
            Copy to clipboard
          </Button>
        </CopyToClipboard>
      </CardActions>
    </Card>
  );
}

export default OutputBox;
