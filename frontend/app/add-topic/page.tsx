import { Navbar } from '@/components/Navbar';
import { TopicForm } from '@/components/TopicForm';

export default function AddTopicPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Topic</h1>
          <p className="mt-2 text-gray-600">
            Create a new interview preparation topic to track your progress
          </p>
        </div>
        <TopicForm />
      </main>
    </>
  );
}
