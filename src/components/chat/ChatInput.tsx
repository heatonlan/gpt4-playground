import React from "react";
import { useOpenAI } from "@/context/OpenAIProvider";
import { MdSend } from "react-icons/md";

type Props = {};


  //
  //prefix_code
  //
  //write new code here
  //
  //suffix_code
  //

function generateFullPromptWriteNew(instructions: string, suffix_code: string, prefix_code: string): string {
  const fullPromptWriteNew = `
      You are an intelligent programmer. Your task is to write me some new code. Your code will be inserted into an existing code file.
      For reference, here is some of the existing code below where your code will be inserted:
      <suffix_code>
      ${suffix_code}
      </suffix_code>
      Your generated code should follow these instructions:
      <instructions_for_new_code>
      ${instructions}
      </instructions_for_new_code>
      You will see my code file. Then, you will output your answer in the following format:
      <answer>
      <prefix_code>
      ${prefix_code}
      </prefix_code>
      <new_code>
      The code above where your code will be inserted
      </new_code>
      </answer>`;
  return fullPromptWriteNew;
}

function generateFullPromptRewrite(instructions: string, suffix_code: string, prefix_code: string): string { return "" }
 
export function extractNewCode(fullPromptWriteNew: string): string {
  const regex = /<new_code>([\s\S]*?)<\/new_code>/;
  const match = fullPromptWriteNew.match(regex);
  if (match) {
    return match[1];
  } else {
    return "";
  }
}

export default function ChatInput({}: Props) {
  const { addMessage, loading } = useOpenAI();
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  const [input, setInput] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (loading) return;
    e.preventDefault();
    let new_input = generateFullPromptWriteNew(input, "", "");
    addMessage(new_input, true, "user");
    setInput("");
  };

  React.useEffect(() => {
    const resize = () => {
      if (textAreaRef.current) {
        textAreaRef.current.style.height = "40px";
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
      }
    };

    resize();
  }, [input]);

  // Handle submitting with enter
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e as any);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSubmit]);

  return (
    <div className="fixed bottom-0 flex h-40 w-full bg-gradient-to-t from-[rgb(var(--bg-secondary))] to-transparent md:w-[calc(100%-260px)]">
      <form
        className="mx-auto flex h-full w-full max-w-4xl items-end justify-center p-4 pb-10"
        onSubmit={handleSubmit}
      >
        <div className="relative flex w-full flex-row rounded border border-stone-500/20 bg-tertiary shadow-xl">
          <textarea
            ref={textAreaRef}
            className="max-h-[200px] w-full resize-none border-none bg-tertiary p-4 text-primary outline-none"
            onChange={handleChange}
            value={input}
            rows={1}
          />
          <button
            type="submit"
            className="rounded p-4 text-primary hover:bg-primary/50"
          >
            {loading ? (
              <div className="mx-auto h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
            ) : (
              <MdSend />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
