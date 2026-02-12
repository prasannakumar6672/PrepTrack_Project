'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { TopicForm } from '@/components/TopicForm';
import { PrepTopic, api } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function EditTopicPage() {
  const params = useParams();
  const id = params.id as string;
  const [topic, setTopic] = useState<PrepTopic | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        setIsLoading(true);
        const data = await api.getTopic(id);
        setTopic(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load topic');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchTopic();
    }
  }, [id]);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Topic</h1>
          <p className="mt-2 text-gray-600">
            Update your interview preparation topic details
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : error ? (
          <Card className="border-red-200 bg-red-50 p-4 text-red-700">
            <p className="font-medium">Error</p>
            <p>{error}</p>
          </Card>
        ) : topic ? (
          <TopicForm topic={topic} />
        ) : (
          <Card className="border-yellow-200 bg-yellow-50 p-4 text-yellow-700">
            <p className="font-medium">Topic not found</p>
            <p>The topic you are looking for does not exist.</p>
          </Card>
        )}
      </main>
    </>
  );
}
