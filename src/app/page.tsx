import MarkdownEditor from '@/components/Editor/MarkdownEditor';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/modeToggle';

export default function Home() {
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
    </>
  );
}
