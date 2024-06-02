import { supabase } from '@/lib/supabaseClient';
import ReactMarkdown from 'react-markdown';
import { Badge } from '@/components/ui/badge';
import React from 'react';

//TODO: 1. 게시물 상세페이지구현
//TODO: 2. 메인페이지에서 글제목클릭하면 상세페이지로
//TODO: 3. 헤더 클릭시 메인으로


export default async function Home() {
  const { data: posts } = await supabase.from('test').select();

  return (
    <>
      <section className="flex items-center justify-start my-8">
        <div className="flex">
          <div className="bg-red-800 p-10 rounded-full"></div>
          <div className="ml-5">
            <p className="font-extrabold text-2xl">@Lehiho</p>
            <p>기억보다 기록을</p>
            <p>각종 url</p>
          </div>
        </div>
      </section>
      <hr className="my-4 border-t-2 border-gray-300" />
      <main>
        <section>
          {posts?.map((post) => (
            <React.Fragment key={post.id}>
              <article className="ml-5 mb-4 prose dark:prose-dark">
                <header>
                  <h2>
                    <a
                      href="/"
                      className="transition duration-200 ease-in-out font-extrabold text-4xl">
                      {post.title}
                    </a>
                  </h2>
                  <p className="text-sm">
                    {new Date(post.created_at).toLocaleDateString('en-US', {
                      month: 'long',
                      day: '2-digit',
                      year: 'numeric',
                    })}
                  </p>
                </header>
                <div className="mt-2">
                  <ReactMarkdown>{post.summary}</ReactMarkdown>
                </div>
                <div className="flex space-x-2">
                  {post.tags?.map((tag: string, index: number) => (
                    <Badge key={index} className="text-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </article>
              <hr className="my-6 border-t-2 border-gray-300" />
            </React.Fragment>
          ))}
        </section>
      </main>
    </>
  );
}
