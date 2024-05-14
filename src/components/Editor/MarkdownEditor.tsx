'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { marked } from 'marked';
import Prism from 'prismjs';
// 언어
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
// 테마
import 'prismjs/themes/prism-tomorrow.css';

// import 'prismjs/plugins/autolinker/prism-autolinker';
// import 'prismjs/plugins/command-line/prism-command-line'
// // import 'prismjs/plugins/download-button/prism-download-button';
// import 'prismjs/plugins/highlight-keywords/prism-highlight-keywords';
// import 'prismjs/plugins/show-language/prism-show-language';
// import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
// import 'prismjs/plugins/inline-color/prism-inline-color';
// import 'prismjs/plugins/previewers/prism-previewers';
// import 'prismjs/plugins/toolbar/prism-toolbar';

const MarkdownEditor: React.FC = () => { const [text, setText] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setText(e.target.value);
  };
// getMarkdownText 함수 내에서 marked 사용
  const getMarkdownText = (): { __html: string } => {
    const rawMarkup = marked(text, {
      highlight: function (code: string, lang: string): string {
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
