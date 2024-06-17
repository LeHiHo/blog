'use client';

// TODO: 1. shadcn/ui 모달 퍼블리싱 완성
// TODO: 2. Server Action으로 리팩토링
// TODO: 3. page.tsx 정리 -> 기능은 마크다운 에디터에서만
// TODO: 4. 이미지 삽입기능
// TODO: 5. useRef사용해서 텍스트입력할떄마다 상태안변하게하기

import React, { useEffect, ChangeEvent, KeyboardEvent, useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '../ui/input';
// @ts-expect-error: import문 오류로 인해 무시
import { marked } from 'marked';
import Prism from 'prismjs';
// 언어
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
// 테마
import 'prismjs/themes/prism-tomorrow.css';

const MarkdownEditor: React.FC = () => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const handleTagKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
      setTags([...tags, e.currentTarget.value.trim()]);
      e.currentTarget.value = '';
      e.preventDefault(); // prevent form submission or other default behavior
    }
  };

  const handleTagRemove = (tag: string): void => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setContent(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/write/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, summary, content, tags }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to submit content');
      }

      alert('Content submitted successfully');
      setTitle('');
      setSummary('');
      setContent('');
      setTags([]);
      setIsSubmitting(false); // Reset the form state
    } catch (error) {
      console.error('Error submitting content:', error);
      alert('Error submitting content');
    }
  };

  const getMarkdownText = (): { __html: string } => {
    const markdownWithHeader = `# ${title}\n\n${content}`;
    const rawMarkup = marked(markdownWithHeader, {
      highlight: function (code: string, lang: string): string {
        const language = Prism.languages[lang] ? lang : 'markup';
        return Prism.highlight(code, Prism.languages[language], language);
      },
    });
    return { __html: rawMarkup };
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      Prism.highlightAll();
    }
  }, [content, title]);

  return (
    <>
      <div className="flex flex-row h-screen justify-center">
        <div className="flex flex-col flex-1 p-4">
          <input
            className="editor-input mb-2 p-2 border border-gray-300 outline-none"
            value={title}
            onChange={handleTitleChange}
            placeholder="제목을 입력하세요"
            style={{ fontSize: '2rem', fontWeight: 'bold', color: '#888' }}
          />
          <div className="editor-input mb-2 p-2 border border-gray-300 outline-none flex flex-wrap items-center">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                className="px-3 py-1 text-sm font-semibold mr-2 mb-2 cursor-pointer"
                onClick={() => handleTagRemove(tag)}>
                {tag}
              </Badge>
            ))}
            <input
              className="flex-1 outline-none"
              onKeyPress={handleTagKeyPress}
              placeholder={
                tags.length === 0 ? '태그를 입력하고 Enter를 누르세요' : ''
              }
            />
          </div>
          <textarea
            className="editor-input flex-1 p-2 border border-gray-300 resize-none outline-none"
            value={content}
            onChange={handleContentChange}
            placeholder="여기에 마크다운을 입력하세요..."
          />
        </div>
        <div
          className="preview flex-1 p-4 overflow-auto prose"
          dangerouslySetInnerHTML={getMarkdownText()}
        />
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>작성완료</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>포스트를 짧게 소개해보세요</DialogTitle>
            <DialogDescription>
              <Input
                id="summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Summary"
                className="col-span-3"
              />
            </DialogDescription>
          </DialogHeader>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MarkdownEditor;
