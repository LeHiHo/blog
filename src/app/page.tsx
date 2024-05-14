import MarkdownEditor from '@/components/Editor/MarkdownEditor';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/modeToggle';

export default function Home() {
  return (
    <>
      <header>
        <div className="flex justify-end m-1">
          <ModeToggle />
        </div>
      </header>
      <main>
      </main>
    </>
  );
}
