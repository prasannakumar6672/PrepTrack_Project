'use client';

import React from "react"

import { PrepTopic, api } from '@/lib/api';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { format } from 'date-fns';

interface TopicFormProps {
  topic?: PrepTopic;
  isLoading?: boolean;
}

const categories = ['DSA', 'DBMS', 'OS', 'CN', 'System Design', 'Projects', 'HR'];
const statuses = ['Not Started', 'In Progress', 'Revised'];

export function TopicForm({ topic, isLoading = false }: TopicFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(topic?.title || '');
  const [category, setCategory] = useState(topic?.category || 'DSA');
  const [status, setStatus] = useState(topic?.status || 'Not Started');
  const [confidenceLevel, setConfidenceLevel] = useState([topic?.confidenceLevel || 3]);
  const [lastRevisedDate, setLastRevisedDate] = useState(
    topic ? format(new Date(topic.lastRevisedDate), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')
  );
  const [notes, setNotes] = useState(topic?.notes || '');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSaving(true);

    try {
      const formData = {
        title,
        category: category as any,
        status: status as any,
        confidenceLevel: confidenceLevel[0],
        lastRevisedDate,
        notes,
      };

      if (topic?._id) {
        await api.updateTopic(topic._id, formData);
      } else {
        await api.createTopic(formData);
      }

      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">Title*</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Binary Trees"
            required
            disabled={isSaving}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="category">Category*</Label>
            <Select value={category} onValueChange={setCategory} disabled={isSaving}>
              <SelectTrigger id="category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="status">Status*</Label>
            <Select value={status} onValueChange={setStatus} disabled={isSaving}>
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="confidence">Confidence Level ({confidenceLevel[0]}/5)*</Label>
          <Slider
            id="confidence"
            min={1}
            max={5}
            step={1}
            value={confidenceLevel}
            onValueChange={setConfidenceLevel}
            disabled={isSaving}
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="lastRevised">Last Revised Date*</Label>
          <Input
            id="lastRevised"
            type="date"
            value={lastRevisedDate}
            onChange={(e) => setLastRevisedDate(e.target.value)}
            required
            disabled={isSaving}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any notes about this topic..."
            disabled={isSaving}
            rows={4}
          />
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex gap-3 border-t pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/')}
            disabled={isSaving}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSaving || !title}
            className="flex-1"
          >
            {isSaving ? 'Saving...' : topic ? 'Update Topic' : 'Add Topic'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
