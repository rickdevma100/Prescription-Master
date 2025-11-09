/**
 * Chat and Prescription related types
 */

export type Role = 'doctor' | 'agent';

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  ts: number;
}

