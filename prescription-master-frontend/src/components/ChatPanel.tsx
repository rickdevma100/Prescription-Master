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
    <div className="h-full flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
      {/* Chat header */}
      <div className="px-4 py-4 bg-gradient-to-r from-blue-600 to-indigo-600">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <span>💬</span> Chat Assistant
        </h2>
        <p className="text-xs text-blue-100 mt-1">AI-powered medical consultation</p>
      </div>

      {/* Messages area with auto-scroll */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin bg-gradient-to-b from-white to-blue-50/30"
        ref={scrollRef}
        aria-live="polite"
        aria-label="Chat messages"
      >
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-dashed border-blue-200">
              <div className="text-4xl mb-3">👋</div>
              <p className="text-gray-600 font-medium">
                Welcome! Start your consultation<br />
                <span className="text-sm text-gray-500">Type a message below to begin</span>
              </p>
            </div>
          </div>
        ) : (
          messages.map((m) => (
            <MessageBubble key={m.id} role={m.role} content={m.content} />
          ))
        )}

        {/* Loading indicator */}
        {loading && (
          <div className="flex items-center gap-3 text-xs text-gray-600 pl-3">
            <div className="flex gap-1">
              <span className="inline-block w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="inline-block w-2.5 h-2.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="inline-block w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="font-medium">Assistant is thinking...</span>
          </div>
        )}

        {/* Error alert */}
        {error && (
          <div
            role="alert"
            className="mx-3 p-4 bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 rounded-lg text-sm text-red-700 shadow-md"
          >
            <strong className="font-bold">⚠️ Error:</strong> {error}
          </div>
        )}
      </div>

      {/* Input area - sticky at bottom */}
      <div className="sticky bottom-0 bg-white border-t-2 border-gray-200 shadow-2xl">
        <InputBox disabled={loading} onSend={send} />
      </div>
    </div>
  );
}

