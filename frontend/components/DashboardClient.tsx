'use client';

import { useState, useEffect } from 'react';
import { TopicCard } from '@/components/TopicCard';
import { api, type PrepTopic } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Search } from 'lucide-react';

interface DashboardClientProps {
  initialTopics: PrepTopic[];
}

export function DashboardClient({ initialTopics }: DashboardClientProps) {
 const [topics, setTopics] = useState<PrepTopic[]>(
  Array.isArray(initialTopics) ? initialTopics : []
);

const [filteredTopics, setFilteredTopics] = useState<PrepTopic[]>(
  Array.isArray(initialTopics) ? initialTopics : []
);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Filter and sort topics
  useEffect(() => {
    let filtered = [...topics];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((t) =>
        t.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter((t) => t.category === categoryFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((t) => t.status === statusFilter);
    }

    // Sort
    switch (sortBy) {
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'confidence':
        filtered.sort((a, b) => b.confidenceLevel - a.confidenceLevel);
        break;
      case 'revised':
        filtered.sort((a, b) => new Date(b.lastRevisedDate).getTime() - new Date(a.lastRevisedDate).getTime());
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    setFilteredTopics(filtered);
  }, [topics, searchTerm, categoryFilter, statusFilter, sortBy]);

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setIsDeleting(true);
      await api.deleteTopic(deleteId);
      setTopics((prev) => prev.filter((t) => t._id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      console.error('Failed to delete topic:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const categories = ['DSA', 'DBMS', 'OS', 'CN', 'System Design', 'Projects', 'HR'];
  const statuses = ['Not Started', 'In Progress', 'Revised'];

  return (
    <>
      {/* Filters and Search */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end">
        <div className="flex-1">
          <label className="mb-2 block text-sm font-medium text-gray-700">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="w-full md:w-40">
          <label className="mb-2 block text-sm font-medium text-gray-700">Category</label>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full md:w-40">
          <label className="mb-2 block text-sm font-medium text-gray-700">Status</label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full md:w-40">
          <label className="mb-2 block text-sm font-medium text-gray-700">Sort By</label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="confidence">Highest Confidence</SelectItem>
              <SelectItem value="revised">Recently Revised</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Topics Grid */}
      {filteredTopics.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <p className="text-lg font-semibold text-gray-900">
            {searchTerm || categoryFilter !== 'all' || statusFilter !== 'all'
              ? 'No topics found'
              : 'No topics yet'}
          </p>
          <p className="mt-1 text-gray-600">
            {searchTerm || categoryFilter !== 'all' || statusFilter !== 'all'
              ? 'Try adjusting your filters'
              : 'Create your first topic to get started'}
          </p>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTopics.map((topic) => (
            <TopicCard
              key={topic._id}
              topic={topic}
              onDelete={(id) => setDeleteId(id)}
            />
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogTitle>Delete Topic</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this topic? This action cannot be undone.
          </AlertDialogDescription>
          <div className="flex gap-3">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
