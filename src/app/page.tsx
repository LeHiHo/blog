import MarkdownEditor from '@/components/Editor/MarkdownEditor';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/modeToggle';
import { supabase } from '@/lib/supabaseClient';
import ReactMarkdown from 'react-markdown';

export default async function Home() {
  const { data: posts } = await supabase.from('test').select();

  return (
    <>
      <header>
        <div className="flex justify-between m-1 items-center">
          <h1>lehiho's blog</h1>
          <ModeToggle />
        </div>
      </header>
      <main className="flex items-center justify-center">
        <div className="flex">
          <div className=" bg-red-800 p-10 rounded-full"></div>
          <div className="ml-5">
            <p>장호진</p>
            <p>기억보다 기록을</p>
            <p>각종 url</p>
          </div>
        </div>
      </main>
      <body>
        <div className="ml-5 prose dark:prose-dark">
          {posts?.map((post) => (
            <div key={post.id} className="mb-4">
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="text-sm">
                {new Date(post.created_at).toLocaleDateString()}
              </p>
              <div className="">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      </body>
    </>
  );
}
