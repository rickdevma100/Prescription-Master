import { useRef, useState, useCallback } from 'react';
import { sendDoctorInput } from '../api/agentApi';
import type { ChatMessage } from '../types/chat';

/**
 * Generate unique ID for chat messages
 */
const uid = () => Math.random().toString(36).slice(2);

/**
 * Custom hook to manage chat messages and interactions
 * Handles sending messages, loading states, and auto-scrolling
 * 
 * @param onPrescriptionUpdate - Callback to update prescription when new data arrives
 */
export function useChat(onPrescriptionUpdate: (prescription: string) => void) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  /**
   * Send a message to the backend
   * Adds user message immediately, then adds agent response when received
   */
  const send = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;

    setError(null);
    setLoading(true);

    // Add doctor's message immediately
    const userMsg: ChatMessage = {
      id: uid(),
      role: 'doctor',
      content: text.trim(),
      ts: Date.now()
    };
    setMessages(prev => [...prev, userMsg]);

    try {
      // Send to backend and get response
      const res = await sendDoctorInput(text.trim());
      
      // Add agent's response
      const agentMsg: ChatMessage = {
        id: uid(),
        role: 'agent',
        content: res.agentResponse,
        ts: Date.now()
      };
      setMessages(prev => [...prev, agentMsg]);
      
      // Update prescription via callback
      onPrescriptionUpdate(res.prescription);
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Failed to send message';
      setError(errorMessage);
    } finally {
      setLoading(false);
      
      // Auto-scroll to bottom after message
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [loading, onPrescriptionUpdate]);

  return {
    messages,
    loading,
    error,
    send,
    scrollRef
  };
}

