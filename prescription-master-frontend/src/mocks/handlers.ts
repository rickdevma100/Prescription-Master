import { http, HttpResponse } from 'msw';

// Sample prescription data for development/testing
const samplePrescription = `# Prescription

**Patient:** John Doe, 35, Male

## Symptoms
- Fever for 3 days
- Cough
- Body aches

## Diagnosis
- Viral Fever

## Medicines
1. **Paracetamol 500mg** — Take twice daily after meals for 3 days
2. **Cetirizine 10mg** — Take once daily at bedtime for 3 days

## Tests Recommended
- Complete Blood Count (CBC)

## Advice
- Drink plenty of water (8-10 glasses daily)
- Take adequate rest
- Avoid cold beverages
- Monitor temperature regularly

## Follow-up
- Return if fever persists beyond 3 days
- Emergency visit if temperature exceeds 103°F

---
*Generated on ${new Date().toLocaleDateString()}*`;

/**
 * MSW Request Handlers for mock API endpoints
 * Used for local development without backend dependency
 */
export const handlers = [
  // POST /api/agent/message - Send doctor input and get prescription update
  http.post('/api/agent/message', async ({ request }) => {
    const body = await request.json() as { message: string };
    const { message } = body;

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    return HttpResponse.json(
      {
        prescription: samplePrescription,
        agentResponse: `Noted: "${message}". I've updated the prescription based on your input.`
      },
      { status: 200 }
    );
  }),

  // GET /api/prescription/current - Fetch current prescription
  http.get('/api/prescription/current', async () => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return HttpResponse.json(
      { prescription: samplePrescription },
      { status: 200 }
    );
  })
];

