'use client';

import { useState } from 'react';
import MarkdownEditor from '@/components/Editor/MarkdownEditor';

export default function Write() {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSummary(e.target.value);
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value.split(',').map((tag) => tag.trim()));
  };

  const handleContentSubmit = () => {
    setIsSubmitting(true);
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

  return (
    <div>
      {!isSubmitting ? (
        <>
          <MarkdownEditor value={content} onChange={handleContentChange} />
          <button onClick={handleContentSubmit}>Submit</button>
        </>
      ) : (
        <div className="mt-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="summary"
              className="block text-sm font-medium text-gray-700">
              Summary
            </label>
            <textarea
              id="summary"
              value={summary}
              onChange={handleSummaryChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700">
              Tags (comma separated)
            </label>
            <input
              id="tags"
              type="text"
              value={tags.join(', ')}
              onChange={handleTagsChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
            Submit All
          </button>
        </div>
      )}
    </div>
  );
}
