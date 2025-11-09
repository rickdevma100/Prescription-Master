import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PrescriptionPanel from '../PrescriptionPanel';

describe('PrescriptionPanel', () => {
  it('shows loading skeleton when loading', () => {
    render(<PrescriptionPanel prescription="" loading={true} />);
    
    expect(screen.getByLabelText('Loading prescription')).toBeInTheDocument();
  });

  it('shows empty state when no prescription', () => {
    render(<PrescriptionPanel prescription="" loading={false} />);
    
    expect(screen.getByText(/No prescription yet/i)).toBeInTheDocument();
  });

  it('renders prescription markdown content', () => {
    const prescription = '# Test Prescription\n\n**Patient:** John Doe';
    render(<PrescriptionPanel prescription={prescription} loading={false} />);
    
    expect(screen.getByText('Test Prescription')).toBeInTheDocument();
  });

  it('has proper accessibility labels', () => {
    render(<PrescriptionPanel prescription="" loading={false} />);
    
    expect(screen.getByRole('region', { name: /prescription view/i })).toBeInTheDocument();
  });
});

