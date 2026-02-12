'use client';

import { Navbar } from '@/components/Navbar';
import { SummaryStats } from '@/components/SummaryStats';
import { DashboardClient } from '@/components/DashboardClient';
import { api, PrepTopic } from '@/lib/api';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function Page() {
  const [topics, setTopics] = useState<PrepTopic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const data = await api.getTopics();
        setTopics(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch topics:', err);
        setError(
          'Failed to load topics. Please check if the backend server is running.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopics();
  }, []);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Connection Error
            </h2>
            <p className="mt-2 text-gray-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
            >
              Retry
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <SummaryStats topics={topics} />
        </div>

        <DashboardClient initialTopics={topics} />
      </main>
    </>
  );
}