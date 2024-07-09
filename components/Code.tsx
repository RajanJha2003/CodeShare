"use client";
import React, { useState } from "react";

interface CodeProps {
  placeholder: string;
  initialValue?: string;
}

import clsx from "clsx";
import { Highlight, themes } from "prism-react-renderer";

const Code = ({ placeholder, initialValue }: CodeProps) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      rows={30}
      className="w-1/2 resize-none"
    />
  );
};

export default Code;
