'use client';

import React, { useEffect, ChangeEvent } from 'react';
// @ts-expect-error: import문 오류로 인해 무시
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
// import 'prismjs/plugins/download-button/prism-download-button';
// import 'prismjs/plugins/highlight-keywords/prism-highlight-keywords';
// import 'prismjs/plugins/show-language/prism-show-language';
// import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
// import 'prismjs/plugins/inline-color/prism-inline-color';
// import 'prismjs/plugins/previewers/prism-previewers';
// import 'prismjs/plugins/toolbar/prism-toolbar';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    onChange(e.target.value);
  };

  const getMarkdownText = (): { __html: string } => {
    const rawMarkup = marked(value, {
      highlight: function (code: string, lang: string): string {
        const language = Prism.languages[lang] ? lang : 'markup';
        return Prism.highlight(code, Prism.languages[language], language);
      },
    });
    return { __html: rawMarkup };
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [value]);

  return (
    <div className="flex flex-row h-screen">
      <textarea
        className="editor-input flex-1 p-4 border-r border-gray-300 resize-none outline-none"
        value={value}
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
