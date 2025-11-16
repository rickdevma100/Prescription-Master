import { useEffect, useRef } from 'react';

interface PrescriptionPanelProps {
  prescription: string;
  loading: boolean;
}

// Function to get today's date in DD-MM-YYYY format
const getTodaysDate = (): string => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  return `${day}-${month}-${year}`;
};

// Dummy prescription data matching the layout
const dummyPrescriptionData = {
  patient: {
    id: "266",
    temp: "36",
    bp: "120/80 mmHg"
  },
  symptoms: [
    "Fever",
    "Headache",
    "Body ache",
    "Cough"
  ],
  medicines: [
    {
      name: "TAB. DEMO MEDICINE 1",
      // dosage: "1 Morning, 1 Night (Before Food)",
      // duration: "10 Days (Tot:20 Tab)"
    },
    {
      name: "CAP. DEMO MEDICINE 2",
        // dosage: "1 Morning, 1 Night (Before Food)",
        // duration: "10 Days (Tot:20 Cap)"
    },
    {
      name: "TAB. DEMO MEDICINE 3",
      // dosage: "1 Morning, 1 Aft, 1 Eve, 1 Night (After Food)",
      // duration: "10 Days (Tot:40 Tab)"
    },
    {
      name: "TAB. DEMO MEDICINE 4",
      // dosage: "1/2 Morning, 1/2 Night (After Food)",
      // duration: "10 Days (Tot:10 Tab)"
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
          <div className="h-8 bg-gray-200 rounded-lg" />
          <div className="h-6 bg-gray-200 rounded-lg w-5/6" />
          <div className="h-6 bg-gray-200 rounded-lg w-4/6" />
          <div className="h-6 bg-gray-200 rounded-lg w-full" />
          <div className="h-6 bg-gray-200 rounded-lg w-3/6" />
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white border border-gray-300 rounded-lg p-6 md:p-8 space-y-6 shadow-sm">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-300 pb-4">
            <div className="flex-1">
              <h1 className="text-lg md:text-xl font-bold text-gray-900">
                DR Prabir Kumar Majumder
              </h1>
              <p className="text-xs md:text-sm text-gray-700 font-medium mt-1">
                MBBS | Reg. No: 1234567890
              </p>
              <p className="text-xs md:text-sm text-gray-600">9830268042</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center">
                <span className="text-gray-800 font-bold text-2xl md:text-3xl">Rx</span>
              </div>
            </div>
            <div className="text-left md:text-right flex-1">
              <h2 className="text-base md:text-lg font-bold text-gray-900">
                Care Clinic
              </h2>
              <p className="text-xs text-gray-700 mt-1">325 Noapara bye lane P:O: Garulia 24 PGS(NORTH) West Bengal 743133</p>
              <p className="text-xs text-gray-600">9830268042</p>
              <p className="text-xs text-gray-600">09:00 AM - 02:00 PM</p>
              <p className="text-xs text-gray-600 font-medium">Closed: Sunday</p>
            </div>
          </div>

          {/* Patient Info & Date */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 bg-gray-50 p-4 rounded border border-gray-300">
            <div className="space-y-1">
              <div className="font-mono text-xl md:text-2xl text-gray-700">|||||||||||||||</div>
              <p className="font-bold text-gray-800">ID {dummyPrescriptionData.patient.id} - Patient's Name: </p>
              <p className="text-sm text-gray-700">
                Temp: {dummyPrescriptionData.patient.temp}°C | 
                BP: {dummyPrescriptionData.patient.bp}
              </p>
            </div>
            <div className="text-left md:text-right">
              <p className="font-semibold text-gray-800 bg-gray-100 px-3 py-1 rounded border border-gray-300">
              Date: {getTodaysDate()}
              </p>
            </div>
          </div>

          {/* Symptoms */}
          <div className="bg-gray-50 p-4 rounded border-l-4 border-gray-400">
            <p className="font-bold text-gray-900 mb-2">
              Chief Complaints / Symptoms:
            </p>
            <ul className="list-disc list-inside space-y-1">
              {dummyPrescriptionData.symptoms.map((symptom, idx) => (
                <li key={idx} className="text-sm text-gray-800">{symptom}</li>
              ))}
            </ul>
          </div>

          {/* Prescription Symbol */}
          <div className="text-4xl font-serif font-bold text-gray-800">℞</div>

          {/* Medicines Table */}
          <div className="border border-gray-300 rounded overflow-hidden">
            <table className="w-full text-xs md:text-sm">
              <thead className="bg-gray-100 border-b border-gray-300">
                <tr>
                  <th className="text-left p-3 border-r border-gray-300 font-bold text-gray-900">Medicine Name</th>
                  <th className="text-left p-3 border-r border-gray-300 font-bold text-gray-900">Dosage</th>
                  <th className="text-left p-3 font-bold text-gray-900">Duration</th>
                </tr>
              </thead>
              <tbody>
                {dummyPrescriptionData.medicines.map((med, idx) => (
                  <tr key={idx} className={`border-b border-gray-200 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    <td className="p-3 border-r border-gray-200 font-medium text-gray-800">{idx + 1}) {med.name}</td>
                    <td className="p-3 border-r border-gray-200 text-gray-700">{med.dosage}</td>
                    <td className="p-3 text-gray-700">{med.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Advice */}
          <div className="bg-gray-50 p-4 rounded border-l-4 border-gray-400">
            <p className="font-bold text-gray-900">
              Advice Given:
            </p>
            <p className="text-sm text-gray-800 mt-2 font-medium">✓ {dummyPrescriptionData.advice}</p>
          </div>

          {/* Follow Up */}
          <div className="bg-gray-50 p-4 rounded border-l-4 border-gray-400">
            <p className="font-bold text-gray-900">
              Next Follow Up: <span className="text-gray-700">{dummyPrescriptionData.followUp}</span>
            </p>
          </div>

          {/* Signature */}
          <div className="flex justify-end pt-6 border-t border-gray-300">
            <div className="text-right">
              <p className="text-2xl mb-2 font-cursive text-gray-800">--------------------------------</p>
              <p className="font-bold text-gray-800">DR Prabir Kumar Majumder</p>
              <p className="text-sm text-gray-600">MBBS</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

