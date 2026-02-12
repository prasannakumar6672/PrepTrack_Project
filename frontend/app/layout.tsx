import React from "react"
import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata = {
  title: 'PrepTrack - Interview Preparation Tracker',
  description: 'Track your interview preparation topics systematically.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
