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
    <div className="h-screen p-3 md:p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Prescription Master
        </h1>
        <p className="text-sm text-gray-600 mt-1">AI-Powered Medical Prescription Assistant</p>
      </div>

      {/* Mobile tabs - visible only on mobile */}
      <div className="md:hidden flex gap-2 mb-3">
        <button
          onClick={() => setMobileTab('prescription')}
          className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
            mobileTab === 'prescription'
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105'
              : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300'
          }`}
          aria-pressed={mobileTab === 'prescription'}
        >
          📋 Prescription
        </button>
        <button
          onClick={() => setMobileTab('chat')}
          className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
            mobileTab === 'chat'
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105'
              : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300'
          }`}
          aria-pressed={mobileTab === 'chat'}
        >
          💬 Chat
        </button>
      </div>

      {/* Desktop/tablet layout - 70/30 split */}
      <div className="hidden md:grid h-[calc(100vh-8rem)] grid-cols-10 gap-6">
        <div className="col-span-7">
          <PrescriptionPanel prescription={prescription} loading={loading} />
        </div>
        <div className="col-span-3">
          <ChatPanel onPrescriptionUpdate={setPrescription} />
        </div>
      </div>

      {/* Mobile content - tab-based view */}
      <div className="md:hidden h-[calc(100vh-10rem)]">
        {mobileTab === 'prescription' ? (
          <PrescriptionPanel prescription={prescription} loading={loading} />
        ) : (
          <ChatPanel onPrescriptionUpdate={setPrescription} />
        )}
      </div>
    </div>
  );
}

