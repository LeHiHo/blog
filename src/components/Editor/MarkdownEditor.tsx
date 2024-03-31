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
    <div className="markdown-editor p-4 max-w-4xl mx-auto">
      <textarea
        className="editor-input"
        value={text}
        onChange={handleChange}
        placeholder="여기에 마크다운을 입력하세요..."
      />
      <div className="preview" dangerouslySetInnerHTML={getMarkdownText()} />
      <div className="bg-black">123</div>
    </div>
  );
};

export default MarkdownEditor;
