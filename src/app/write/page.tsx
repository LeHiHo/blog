'use client';

import { useState } from 'react';
import MarkdownEditor from '@/components/Editor/MarkdownEditor';

export default function Write() {
  const [content, setContent] = useState('');

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  console.log(content);

  const handleSubmit = async () => {
    try {
      const response = await fetch('/write/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to submit content');
      }

      alert('Content submitted successfully');
      setContent(''); // Clear the content after successful submission
    } catch (error) {
      console.error('Error submitting content:', error);
      alert('Error submitting content');
    }
  };

  return (
    <div>
      <MarkdownEditor value={content} onChange={handleContentChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
