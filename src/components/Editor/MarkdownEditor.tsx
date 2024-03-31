'use client';

import React, { useState, ChangeEvent } from 'react';
import { marked } from 'marked';

const MarkdownEditor: React.FC = () => {
  const [text, setText] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  // marked 라이브러리를 사용하여 마크다운을 HTML로 변환
  const getMarkdownText = () => {
    const rawMarkup = marked(text);
    return { __html: rawMarkup };
  };

  return (
    <div className="flex flex-row h-screen">
      <textarea
        className="editor-input flex-1 p-4 border-r border-gray-300 resize-none outline-none"
        value={text}
        onChange={handleChange}
        placeholder="여기에 마크다운을 입력하세요..."
      />
      <div
        className="preview flex-1 p-4 overflow-auto prose"
        dangerouslySetInnerHTML={getMarkdownText()}
      />
    </div>
  );
};

export default MarkdownEditor;
