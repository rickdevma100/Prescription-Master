import { useState, useEffect, useRef, type KeyboardEvent, type ChangeEvent } from 'react';

interface InputBoxProps {
  disabled?: boolean;
  onSend: (text: string) => void;
}

/**
 * InputBox - Chat input field with Send button
 * Features:
 * - Auto-focus on mount
 * - Auto-send after 2 seconds of inactivity
 * - Enter key to send (Shift+Enter for new line)
 * - Auto-clear after send
 * - Disabled state during loading
 * - Voice input placeholder (hidden for future implementation)
 */
export default function InputBox({ disabled, onSend }: InputBoxProps) {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<number | null>(null);

  // Auto-focus on mount and when disabled changes to false
  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const send = () => {
    if (text.trim()) {
      // Clear any pending auto-send timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      onSend(text.trim());
      setText('');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setText(newText);

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout to auto-send after 3 seconds of inactivity
    if (newText.trim()) {
      timeoutRef.current = setTimeout(() => {
        if (newText.trim()) {
          onSend(newText.trim());
          setText('');
        }
      }, 3000);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-blue-50">
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
        ref={inputRef}
        type="text"
        aria-label="Chat input"
        className="flex-1 border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all shadow-sm"
        placeholder="Type your message (auto-sends after 2s)…"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />

      <button
        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg flex items-center gap-2"
        onClick={send}
        disabled={disabled || !text.trim()}
        aria-label="Send message"
      >
        <span>Send</span>
        <span>📤</span>
      </button>
    </div>
  );
}

