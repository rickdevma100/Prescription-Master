import { useState } from 'react';
import PrescriptionPanel from '../components/PrescriptionPanel';
import ChatPanel from '../components/ChatPanel';
import { usePrescription } from '../hooks/usePrescription';

type MobileTab = 'prescription' | 'chat';

/**
 * PrescriptionPage - Main page layout with responsive behavior
 * 
 * Desktop (md+): 70/30 horizontal split
 * Tablet: Vertical stack or horizontal based on md breakpoint
 * Mobile: Tab toggle between prescription and chat
 */
export default function PrescriptionPage() {
  const { prescription, setPrescription, loading } = usePrescription();
  const [mobileTab, setMobileTab] = useState<MobileTab>('prescription');

  return (
    <div className="h-screen p-3 md:p-4 bg-gray-50">
      {/* Mobile tabs - visible only on mobile */}
      <div className="md:hidden flex gap-2 mb-3">
        <button
          onClick={() => setMobileTab('prescription')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            mobileTab === 'prescription'
              ? 'bg-brand-primary text-white shadow-sm'
              : 'bg-white text-gray-700 border border-gray-300'
          }`}
          aria-pressed={mobileTab === 'prescription'}
        >
          Prescription
        </button>
        <button
          onClick={() => setMobileTab('chat')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            mobileTab === 'chat'
              ? 'bg-brand-primary text-white shadow-sm'
              : 'bg-white text-gray-700 border border-gray-300'
          }`}
          aria-pressed={mobileTab === 'chat'}
        >
          Chat
        </button>
      </div>

      {/* Desktop/tablet layout - 70/30 split */}
      <div className="hidden md:grid h-[calc(100vh-2rem)] grid-cols-10 gap-4">
        <div className="col-span-7">
          <PrescriptionPanel prescription={prescription} loading={loading} />
        </div>
        <div className="col-span-3">
          <ChatPanel onPrescriptionUpdate={setPrescription} />
        </div>
      </div>

      {/* Mobile content - tab-based view */}
      <div className="md:hidden h-[calc(100vh-5rem)]">
        {mobileTab === 'prescription' ? (
          <PrescriptionPanel prescription={prescription} loading={loading} />
        ) : (
          <ChatPanel onPrescriptionUpdate={setPrescription} />
        )}
      </div>
    </div>
  );
}

