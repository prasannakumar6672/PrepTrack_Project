import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
            <span className="text-lg font-bold text-white">P</span>
          </div>
          <Link href="/" className="text-xl font-semibold text-gray-900">
            PrepTrack
          </Link>
        </div>
        <Link href="/add-topic">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Topic
          </Button>
        </Link>
      </div>
    </nav>
  );
}
