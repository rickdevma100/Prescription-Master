import type { Role } from '../types/chat';

interface MessageBubbleProps {
  role: Role;
  content: string;
}

/**
 * MessageBubble - Displays a single chat message with role-based styling
 * Doctor messages align right with blue background
 * Agent messages align left with light blue background
 */
export default function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === 'doctor';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} my-2`}>
      <div
        aria-label={isUser ? 'Doctor message' : 'Agent message'}
        className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
          isUser
            ? 'bg-brand-primary text-white'
            : 'bg-brand-secondary text-gray-900'
        }`}
      >
        {content}
      </div>
    </div>
  );
}

