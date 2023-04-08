import { CopyToClipboard } from "react-copy-to-clipboard";
import CopyIcon from "./CopyIcon";

// function CopyButton({ output }) {}

type OutputBoxProps = {
  title: string;
  output: string;
  copied: boolean;
  onCopy: () => void;
};

function OutputBox({ title, output, copied, onCopy }: OutputBoxProps) {
  if (!output) {
    return null;
  }

  return (
    <div className="my-4 px-4 py-4 shadow-md border-green-100 bg-gray-100">
      <div className="relative">
        <p className="text-success">{title}</p>
        <pre className="w-full overflow-auto">{output}</pre>
        <CopyToClipboard text={output} onCopy={onCopy}>
          <div className="absolute left-full bottom-full cursor-pointer">
            <CopyIcon copied={copied} />
          </div>
        </CopyToClipboard>
      </div>
    </div>
  );
}

export default OutputBox;
