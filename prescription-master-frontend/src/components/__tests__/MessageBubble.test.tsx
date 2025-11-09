import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MessageBubble from '../MessageBubble';

describe('MessageBubble', () => {
  it('renders doctor message with correct styling', () => {
    render(<MessageBubble role="doctor" content="Test message" />);
    
    const message = screen.getByLabelText('Doctor message');
    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent('Test message');
  });

  it('renders agent message with correct styling', () => {
    render(<MessageBubble role="agent" content="Agent response" />);
    
    const message = screen.getByLabelText('Agent message');
    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent('Agent response');
  });
});

