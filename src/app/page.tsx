import MarkdownEditor from '@/components/Editor/MarkdownEditor';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabaseClient';
import ReactMarkdown from 'react-markdown';
import { Badge } from '@/components/ui/badge';

export default async function Home() {
  const { data: posts } = await supabase.from('test').select();

  return (
    <>
      <section className="flex items-center justify-start my-8">
        <div className="flex">
          <div className="bg-red-800 p-10 rounded-full"></div>
          <div className="ml-5">
            <p className="font-extrabold">@Lehiho</p>
            <p>기억보다 기록을</p>
            <p>각종 url</p>
          </div>
        </div>
      </section>
      <hr className="my-4 border-t-2 border-gray-300" />
      <main className="w-full">
        <section className="mx-auto max-w-7xl w-full prose dark:prose-dark">
          {posts?.map((post) => (
            <article key={post.id} className="w-full ">
              <header>
                <h2>
                  <a className="transition duration-200 ease-in-out font-extrabold">
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
              <div>
                <ReactMarkdown>{post.summary}</ReactMarkdown>
              </div>
              <div className="flex space-x-2">
                {post.tags.map((tag: string, index: number) => (
                  <Badge key={index}>{tag}</Badge>
                ))}
              </div>
              <hr />
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
