import MessageBubble from './MessageBubble';
import InputBox from './InputBox';
import { useChat } from '../hooks/useChat';

interface ChatPanelProps {
  onPrescriptionUpdate: (prescription: string) => void;
}

/**
 * ChatPanel - Complete chat interface with message history and input
 * Features:
 * - Message list with auto-scroll
 * - Loading indicator while waiting for response
 * - Error alerts
 * - Integration with useChat hook for API communication
 */
export default function ChatPanel({ onPrescriptionUpdate }: ChatPanelProps) {
  const { messages, loading, error, send, scrollRef } = useChat(onPrescriptionUpdate);

  return (
    <div className="h-full flex flex-col border border-gray-200 rounded-lg bg-white shadow-sm">
      {/* Chat header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-800">Chat Assistant</h2>
        <p className="text-xs text-gray-600">Type your message to start consultation</p>
      </div>

      {/* Messages area with auto-scroll */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-2"
        ref={scrollRef}
        aria-live="polite"
        aria-label="Chat messages"
      >
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center">
            <p className="text-gray-500 text-sm">
              No messages yet.<br />
              Start by typing a message below.
            </p>
          </div>
        ) : (
          messages.map((m) => (
            <MessageBubble key={m.id} role={m.role} content={m.content} />
          ))
        )}

        {/* Loading indicator */}
        {loading && (
          <div className="flex items-center gap-2 text-xs text-gray-500 pl-3">
            <div className="flex gap-1">
              <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span>Agent is typing…</span>
          </div>
        )}

        {/* Error alert */}
        {error && (
          <div
            role="alert"
            className="mx-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700"
          >
            <strong className="font-semibold">Error:</strong> {error}
          </div>
        )}
      </div>

      {/* Input area */}
      <InputBox disabled={loading} onSend={send} />
    </div>
  );
}

