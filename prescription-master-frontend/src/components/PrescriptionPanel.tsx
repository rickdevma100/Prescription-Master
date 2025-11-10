import { useEffect, useRef } from 'react';

interface PrescriptionPanelProps {
  prescription: string;
  loading: boolean;
}

// Dummy prescription data matching the layout
const dummyPrescriptionData = {
  doctor: {
    name: "Dr. Prabir Kumar Majumder",
    qualifications: "M.B.B.S.",
    regNo: "270988",
    mobile: "9830268042"
  },
  clinic: {
    name: "Care Clinic",
    address: "325 Noapara bye lane P:O: Garulia 24 PGS(NORTH) West Bengal 743133",
    phone: "9830268042",
    timing: "09:00 AM - 02:00 PM",
    closed: "Sunday"
  },
  patient: {
    id: "266",
    name: "DEMO PATIENT (M)",
    address: "Kolkata",
    temp: "36",
    bp: "120/80 mmHg"
  },
  date: "27-Apr-2020, 04:37 PM",
  medicines: [
    {
      name: "TAB. DEMO MEDICINE 1",
      dosage: "1 Morning, 1 Night (Before Food)",
      duration: "10 Days (Tot:20 Tab)"
    },
    {
      name: "CAP. DEMO MEDICINE 2",
      dosage: "1 Morning, 1 Night (Before Food)",
      duration: "10 Days (Tot:20 Cap)"
    },
    {
      name: "TAB. DEMO MEDICINE 3",
      dosage: "1 Morning, 1 Aft, 1 Eve, 1 Night (After Food)",
      duration: "10 Days (Tot:40 Tab)"
    },
    {
      name: "TAB. DEMO MEDICINE 4",
      dosage: "1/2 Morning, 1/2 Night (After Food)",
      duration: "10 Days (Tot:10 Tab)"
    }
  ],
  advice: "AVOID OILY AND SPICY FOOD",
  followUp: "12-05-2020"
};

export default function PrescriptionPanel({ prescription, loading }: PrescriptionPanelProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [prescription]);

  return (
    <div 
      className="h-full overflow-y-auto p-4 md:p-6 bg-white rounded-2xl shadow-2xl border border-gray-200 scrollbar-thin"
      ref={ref}
      aria-label="Prescription view"
      role="region"
    >
      {loading ? (
        <div className="animate-pulse space-y-4" aria-busy="true" aria-label="Loading prescription">
          <div className="h-8 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg" />
          <div className="h-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg w-5/6" />
          <div className="h-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg w-4/6" />
          <div className="h-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg w-full" />
          <div className="h-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg w-3/6" />
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 border-2 border-blue-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-2 border-gradient-to-r from-blue-400 to-purple-400 pb-4">
            <div className="flex-1">
              <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {dummyPrescriptionData.doctor.name}
              </h1>
              <p className="text-xs md:text-sm text-gray-700 font-medium mt-1">
                {dummyPrescriptionData.doctor.qualifications} | Reg. No: {dummyPrescriptionData.doctor.regNo}
              </p>
              <p className="text-xs md:text-sm text-gray-600">📱 {dummyPrescriptionData.doctor.mobile}</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
                <span className="text-white font-bold text-2xl md:text-3xl">Rx</span>
              </div>
            </div>
            
            <div className="text-left md:text-right flex-1">
              <h2 className="text-base md:text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {dummyPrescriptionData.clinic.name}
              </h2>
              <p className="text-xs text-gray-700 mt-1">📍 {dummyPrescriptionData.clinic.address}</p>
              <p className="text-xs text-gray-600">☎️ {dummyPrescriptionData.clinic.phone}</p>
              <p className="text-xs text-gray-600">🕐 {dummyPrescriptionData.clinic.timing}</p>
              <p className="text-xs text-red-600 font-medium">🚫 Closed: {dummyPrescriptionData.clinic.closed}</p>
            </div>
          </div>

          {/* Patient Info & Date */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
            <div className="space-y-1">
              <div className="font-mono text-xl md:text-2xl text-gray-700">|||||||||||||||</div>
              <p className="font-bold text-gray-800">🆔 {dummyPrescriptionData.patient.id} - {dummyPrescriptionData.patient.name}</p>
              <p className="text-sm text-gray-700">📍 {dummyPrescriptionData.patient.address}</p>
              <p className="text-sm text-gray-700">
                🌡️ Temp: {dummyPrescriptionData.patient.temp}°C | 
                💉 BP: {dummyPrescriptionData.patient.bp}
              </p>
            </div>
            <div className="text-left md:text-right">
              <p className="font-semibold text-gray-800 bg-yellow-100 px-3 py-1 rounded-lg border border-yellow-300">
                📅 {dummyPrescriptionData.date}
              </p>
            </div>
          </div>

          {/* Prescription Symbol */}
          <div className="text-4xl font-serif font-bold text-blue-600">℞</div>

          {/* Medicines Table */}
          <div className="border-2 border-blue-300 rounded-xl overflow-hidden shadow-md">
            <table className="w-full text-xs md:text-sm">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-b-2 border-blue-400">
                <tr>
                  <th className="text-left p-3 border-r border-blue-400 font-bold">💊 Medicine Name</th>
                  <th className="text-left p-3 border-r border-blue-400 font-bold">⏰ Dosage</th>
                  <th className="text-left p-3 font-bold">📆 Duration</th>
                </tr>
              </thead>
              <tbody>
                {dummyPrescriptionData.medicines.map((med, idx) => (
                  <tr key={idx} className={`border-b border-blue-100 ${idx % 2 === 0 ? 'bg-blue-50/50' : 'bg-white'} hover:bg-blue-100 transition-colors`}>
                    <td className="p-3 border-r border-blue-200 font-medium text-gray-800">{idx + 1}) {med.name}</td>
                    <td className="p-3 border-r border-blue-200 text-gray-700">{med.dosage}</td>
                    <td className="p-3 text-gray-700">{med.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Advice */}
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-xl border-l-4 border-amber-500 shadow-md">
            <p className="font-bold text-amber-800 flex items-center gap-2">
              <span>⚠️</span> Advice Given:
            </p>
            <p className="text-sm text-amber-900 mt-2 font-medium">✓ {dummyPrescriptionData.advice}</p>
          </div>

          {/* Follow Up */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border-l-4 border-green-500 shadow-md">
            <p className="font-bold text-green-800">
              🔄 Next Follow Up: <span className="text-green-600">{dummyPrescriptionData.followUp}</span>
            </p>
          </div>

          {/* Signature */}
          <div className="flex justify-end pt-6 border-t-2 border-gray-200">
            <div className="text-right">
              <p className="text-2xl mb-2 font-cursive text-blue-600">Signature</p>
              <p className="font-bold text-gray-800">{dummyPrescriptionData.doctor.name}</p>
              <p className="text-sm text-gray-600">{dummyPrescriptionData.doctor.qualifications}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

