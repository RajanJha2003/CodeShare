"use client";
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Highlight, themes } from "prism-react-renderer";

const Code: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [isTextAreaFocused, setIsTextAreaFocused] = useState<boolean>(true);

  const preRef = useRef<HTMLPreElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const adjustTextAreaHeight = () => {
    if (containerRef.current && preRef.current && textAreaRef.current) {
      const containerHeight = containerRef.current.scrollHeight;
      const preHeight = preRef.current.scrollHeight;

      console.log("Container Height:", containerHeight);
      console.log("Pre Height:", preHeight);

      textAreaRef.current.style.height = `${Math.max(
        containerHeight,
        preHeight
      )}px`;
    }
  };

  useEffect(() => {
    adjustTextAreaHeight();
  }, [value]);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  return (
    <div
      className={clsx(
        isTextAreaFocused ? "border-pink-400" : "border-white/20",
        "h-96 w-2/3 max-w-4xl rounded-xl border-[1px] py-4",
        "transition-colors duration-300 ease-in-out"
      )}
    >
      <div
        ref={containerRef}
        className="relative h-full w-full overflow-auto"
      >
        <Highlight theme={themes.nightOwl} code={value} language="jsx">
          {({ className, tokens, getLineProps, getTokenProps }) => (
            <>
              <textarea
                ref={textAreaRef}
                value={value}
                placeholder="Add some code here..."
                onChange={handleChange}
                spellCheck={false}
                onFocus={() => setIsTextAreaFocused(true)}
                onBlur={() => setIsTextAreaFocused(false)}
                className={clsx(
                  "absolute w-full resize-none overflow-hidden whitespace-pre-wrap break-words break-keep bg-transparent pl-16 pr-3 font-mono text-transparent",
                  "caret-pink-500 selection:bg-pink-500/30 placeholder:text-white/20 focus:outline-none"
                )}
              />
              <pre
                ref={preRef}
                aria-hidden={true}
                className={clsx(
                  className,
                  "pointer-events-none absolute w-full select-none pr-3"
                )}
              >
                {tokens.map((line, i) => (
                  <div
                    key={i}
                    {...getLineProps({ line, key: i })}
                    className="table-row"
                  >
                    <span className="table-cell w-10 select-none text-right opacity-50">
                      {i + 1}
                    </span>
                    <code className="table-cell whitespace-pre-wrap break-words break-keep pl-6">
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </code>
                  </div>
                ))}
              </pre>
            </>
          )}
        </Highlight>
      </div>
    </div>
  );
};

export default Code;
