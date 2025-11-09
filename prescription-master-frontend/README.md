# Doctor's Prescription Frontend

A responsive React + TypeScript application for doctors to write prescriptions through a conversational chat-based interface.

## 📋 Overview

This application provides:
- **Prescription View Panel (70%)**: Displays formatted prescription with markdown support
- **Chat Interface (30%)**: Conversational UI for inputting patient information
- **Responsive Design**: Desktop (70/30 split), Tablet (vertical stack), Mobile (tab toggle)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Modern web browser

### Installation

```bash
# Install dependencies
npm install
```

### Configuration

Create a `.env` file in the project root:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000

# Set to 'true' to use mock data (for development without backend)
VITE_USE_MOCKS=true
```

See `.env.example` for reference.

## 🛠️ Development

### Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Mock API (Development Mode)

The application includes Mock Service Worker (MSW) for development without a backend:

1. **Enable Mocks**: Set `VITE_USE_MOCKS=true` in your `.env` file
2. **Start Dev Server**: Run `npm run dev`
3. **Verify**: Check console for "🔶 MSW: Mock Service Worker enabled"

Mock endpoints:
- `POST /api/agent/message` - Send doctor input, receive prescription update
- `GET /api/prescription/current` - Fetch current prescription

**To disable mocks**: Set `VITE_USE_MOCKS=false` or remove the variable

### Build for Production

```bash
# Type check and build
npm run build

# Preview production build
npm run preview
```

### Code Quality

```bash
# Run ESLint
npm run lint
```

## 🏗️ Project Structure

```
src/
├── api/
│   └── agentApi.ts           # API client with Axios
├── components/
│   ├── ChatPanel.tsx          # Chat interface container
│   ├── InputBox.tsx           # Message input with Send button
│   ├── MessageBubble.tsx      # Chat message bubble
│   └── PrescriptionPanel.tsx  # Prescription display panel
├── hooks/
│   ├── useChat.ts             # Chat state management
│   └── usePrescription.ts     # Prescription state management
├── mocks/
│   ├── browser.ts             # MSW browser worker setup
│   └── handlers.ts            # Mock API handlers
├── pages/
│   └── PrescriptionPage.tsx   # Main layout page
├── styles/
│   └── globals.css            # Global styles with Tailwind
├── types/
│   └── chat.ts                # TypeScript type definitions
├── App.tsx                    # Root component
└── main.tsx                   # Application entry point
```

## 🎨 Tech Stack

- **Framework**: React 18+
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Typography plugin
- **State Management**: React Hooks
- **API Client**: Axios
- **Markdown Rendering**: react-markdown + rehype-sanitize
- **Mock API**: MSW (Mock Service Worker)
- **Build Tool**: Vite
- **Code Quality**: ESLint + TypeScript strict mode

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (Tab-based navigation)
- **Desktop/Tablet**: ≥ 768px (70/30 split layout)

## 🔒 Security Features

- HTML sanitization for user inputs (prevents XSS)
- Markdown content sanitized with rehype-sanitize
- TypeScript strict mode enabled
- Input validation before API calls

## 🧪 Testing

The application is designed with testing in mind:
- MSW for API mocking
- Component structure supports unit testing
- Accessibility attributes included (ARIA labels, roles)

## 📝 API Integration

### Backend Requirements

The frontend expects these endpoints:

#### POST /api/agent/message
```typescript
Request:  { message: string }
Response: { prescription: string, agentResponse: string }
```

#### GET /api/prescription/current
```typescript
Response: { prescription: string }
```

### Environment Variables

- `VITE_API_BASE_URL`: Backend API base URL
- `VITE_USE_MOCKS`: Enable/disable mock API (true/false)

## 🎯 Features

✅ Chat-based prescription input
✅ Real-time prescription updates
✅ Markdown support for formatted prescriptions
✅ Auto-scroll in chat and prescription panels
✅ Loading states and error handling
✅ Responsive design (mobile, tablet, desktop)
✅ Accessibility compliant (WCAG 2.1 AA)
✅ Input sanitization for security
✅ Professional medical-grade UI

## 📄 License

This project is part of the Doctor's Prescription system.

## 🤝 Contributing

1. Follow TypeScript strict mode
2. Maintain ESLint configuration
3. Ensure responsive design works across breakpoints
4. Add ARIA labels for accessibility
5. Test with mock API before backend integration
