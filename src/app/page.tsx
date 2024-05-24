import MarkdownEditor from '@/components/Editor/MarkdownEditor';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabaseClient';
import ReactMarkdown from 'react-markdown';

export default async function Home() {
  const { data: posts } = await supabase.from('test').select();

  return (
    <>
      <section className="flex items-center justify-center my-8">
        <div className="flex">
          <div className="bg-red-800 p-10 rounded-full"></div>
          <div className="ml-5">
            <p>장호진</p>
            <p>기억보다 기록을</p>
            <p>각종 url</p>
          </div>
        </div>
      </section>
      <hr className="my-4 border-t-2 border-gray-300" />
      <main>
        <section className="ml-5 prose dark:prose-dark">
          {posts?.map((post) => (
            <article key={post.id} className="mb-4">
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
              <div className="mt-2">
                <ReactMarkdown>{post.summary}</ReactMarkdown>
              </div>
              <div className="mt-4 flex space-x-2">{post.tags}</div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
