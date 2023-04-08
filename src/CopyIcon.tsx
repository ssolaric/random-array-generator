import React from "react";
import { FaCopy, FaClipboardCheck } from "react-icons/fa";

type CopyIconProps = {
  copied: boolean;
};

function CopyIcon({ copied }: CopyIconProps) {
  const Icon = copied ? FaClipboardCheck : FaCopy;
  return (
    <div className="relative">
      <div className="absolute -right-1">
        <Icon size={20} />
      </div>
    </div>
  );
}

export default CopyIcon;
