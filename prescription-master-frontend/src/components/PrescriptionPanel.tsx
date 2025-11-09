import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';

interface PrescriptionPanelProps {
  prescription: string;
  loading: boolean;
}

/**
 * PrescriptionPanel - Displays formatted prescription with markdown support
 * Features:
 * - Markdown rendering with HTML sanitization
 * - Skeleton loader for loading state
 * - Auto-scroll to latest content
 * - Empty state message
 */
export default function PrescriptionPanel({ prescription, loading }: PrescriptionPanelProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when prescription updates
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [prescription]);

  return (
    <div 
      className="h-full overflow-y-auto p-4 bg-white border rounded-md"
      ref={ref}
      aria-label="Prescription view"
      role="region"
    >
      {loading ? (
        // Skeleton loader while fetching
        <div className="animate-pulse space-y-3" aria-busy="true" aria-label="Loading prescription">
          <div className="h-6 bg-brand-gray rounded" />
          <div className="h-4 bg-brand-gray rounded w-5/6" />
          <div className="h-4 bg-brand-gray rounded w-4/6" />
          <div className="h-4 bg-brand-gray rounded w-full" />
          <div className="h-4 bg-brand-gray rounded w-3/6" />
        </div>
      ) : prescription ? (
        // Render prescription with markdown support
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
            {prescription}
          </ReactMarkdown>
        </div>
      ) : (
        // Empty state
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 text-center">
            No prescription yet.<br />
            Start by chatting on the right.
          </p>
        </div>
      )}
    </div>
  );
}

