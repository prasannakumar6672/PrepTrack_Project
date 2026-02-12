'use client';

import { PrepTopic } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

interface TopicCardProps {
  topic: PrepTopic;
  onDelete: (id: string) => void;
}

const statusColors = {
  'Not Started': 'bg-gray-100 text-gray-800',
  'In Progress': 'bg-yellow-100 text-yellow-800',
  'Revised': 'bg-green-100 text-green-800',
};

const categoryColors = {
  'DSA': 'bg-blue-100 text-blue-800',
  'DBMS': 'bg-purple-100 text-purple-800',
  'OS': 'bg-indigo-100 text-indigo-800',
  'CN': 'bg-pink-100 text-pink-800',
  'System Design': 'bg-orange-100 text-orange-800',
  'Projects': 'bg-teal-100 text-teal-800',
  'HR': 'bg-cyan-100 text-cyan-800',
};

export function TopicCard({ topic, onDelete }: TopicCardProps) {
  const confidenceDots = Array.from({ length: 5 }, (_, i) => i < topic.confidenceLevel);

  return (
    <Card className="flex flex-col gap-4 p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-2 flex-1">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{topic.title}</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className={categoryColors[topic.category]}>
              {topic.category}
            </Badge>
            <Badge className={statusColors[topic.status]}>
              {topic.status}
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-sm text-gray-600">
          <p className="font-medium">Confidence Level</p>
          <div className="flex gap-1 mt-1">
            {confidenceDots.map((filled, i) => (
              <div
                key={i}
                className={`h-2 w-2 rounded-full ${filled ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
              />
            ))}
          </div>
        </div>

        {topic.notes && (
          <div className="text-sm text-gray-600">
            <p className="font-medium">Notes</p>
            <p className="line-clamp-2 text-gray-700">{topic.notes}</p>
          </div>
        )}

        <p className="text-xs text-gray-500">
          Last Revised: {format(new Date(topic.lastRevisedDate), 'MMM dd, yyyy')}
        </p>
      </div>

      <div className="flex gap-2 border-t pt-4">
        <Link href={`/edit/${topic._id}`} className="flex-1">
          <Button variant="outline" className="w-full gap-2 bg-transparent">
            <Edit2 className="h-4 w-4" />
            Edit
          </Button>
        </Link>
        <Button
          variant="destructive"
          size="icon"
          onClick={() => onDelete(topic._id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
