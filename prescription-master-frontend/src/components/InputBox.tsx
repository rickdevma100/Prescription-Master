import { useState, type KeyboardEvent } from 'react';

interface InputBoxProps {
  disabled?: boolean;
  onSend: (text: string) => void;
}

/**
 * InputBox - Chat input field with Send button
 * Features:
 * - Enter key to send (Shift+Enter for new line)
 * - Auto-clear after send
 * - Disabled state during loading
 * - Voice input placeholder (hidden for future implementation)
 */
export default function InputBox({ disabled, onSend }: InputBoxProps) {
  const [text, setText] = useState('');

  const send = () => {
    if (text.trim()) {
      onSend(text.trim());
      setText('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="flex items-center gap-2 p-3 border-t border-gray-200 bg-white">
      {/* Voice input placeholder - hidden for future implementation */}
      <button
        className="hidden"
        aria-label="Voice input (coming soon)"
        title="Voice input (coming soon)"
        disabled
      >
        🎤
      </button>

      <input
        type="text"
        aria-label="Chat input"
        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
        placeholder="Type your message here…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />

      <button
        className="bg-brand-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-brand-primary"
        onClick={send}
        disabled={disabled || !text.trim()}
        aria-label="Send message"
      >
        Send
      </button>
    </div>
  );
}

