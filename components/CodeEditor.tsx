import React from 'react';

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ code, setCode }) => {
  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-1 font-mono text-sm h-full">
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full h-[320px] bg-transparent text-slate-300 resize-none border-0 focus:outline-none focus:ring-0 p-3"
        spellCheck="false"
      />
    </div>
  );
};
