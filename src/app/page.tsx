import MarkdownEditor from '@/components/Editor/MarkdownEditor';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/modeToggle';

export default function Home() {
  return (
    <>
      <header>
        <div className="flex justify-between m-1">
          <h1>lehiho's blog</h1>
          <ModeToggle />
        </div>
      </header>
      <main className="flex items-center justify-center">안녕하세요</main>
    </>
  );
}
