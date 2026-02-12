'use client';

import type { PrepTopic } from '@/lib/api';
import { Card } from '@/components/ui/card';

interface SummaryStatsProps {
  topics?: PrepTopic[];
}

export function SummaryStats({ topics }: SummaryStatsProps) {
  // Always ensure safe array
  const safeTopics = Array.isArray(topics) ? topics : [];

  const totalTopics = safeTopics.length;

  const topicsInProgress = safeTopics.filter(
    (t) => t.status === 'In Progress'
  ).length;

  const topicsRevised = safeTopics.filter(
    (t) => t.status === 'Revised'
  ).length;

  const averageConfidence =
    safeTopics.length > 0
      ? Math.round(
          (safeTopics.reduce(
            (sum, t) => sum + (t.confidenceLevel || 0),
            0
          ) /
            safeTopics.length) *
            100
        ) / 100
      : 0;

  const stats = [
    {
      label: 'Total Topics',
      value: totalTopics,
      color: 'bg-blue-50 text-blue-900',
    },
    {
      label: 'In Progress',
      value: topicsInProgress,
      color: 'bg-yellow-50 text-yellow-900',
    },
    {
      label: 'Revised',
      value: topicsRevised,
      color: 'bg-green-50 text-green-900',
    },
    {
      label: 'Avg Confidence',
      value: `${averageConfidence}/5`,
      color: 'bg-purple-50 text-purple-900',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((stat, idx) => (
        <Card key={idx} className={`${stat.color} p-4`}>
          <p className="text-sm font-medium opacity-75">{stat.label}</p>
          <p className="mt-2 text-2xl font-bold">{stat.value}</p>
        </Card>
      ))}
    </div>
  );
}