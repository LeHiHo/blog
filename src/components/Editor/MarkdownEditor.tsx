'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { marked } from 'marked';

import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // _document.tsx 파일에 추가하거나 여기에 임포트할 수 있습니다.

const MarkdownEditor: React.FC = () => {
  const [text, setText] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setText(e.target.value);
  };

  const getMarkdownText = (): { __html: string } => {
    const rawMarkup = marked(text, {
      highlight: function (code, lang) {
        // TypeScript를 사용하면서 Prism.languages[lang]의 존재 여부를 체크
        const language = Prism.languages[lang] ? lang : 'markup';
        return Prism.highlight(code, Prism.languages[language], language);
      },
    });
    return { __html: rawMarkup };
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [text]);

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
