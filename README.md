# 🗺️ The Secret Heart Pocket

**Premium Story Platform** - Built with Legacy, Connection, and Innovation in mind.

Created for Leif & Lewie. Never stop exploring.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (20+ recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will start at `http://localhost:3000`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 🔧 Configuration

### Firebase Setup

The app expects Firebase configuration to be provided at runtime via one of these methods:

1. **Global Variables** (Gold Master pattern):
   ```html
   <script>
     window.__firebase_config = '{"apiKey":"...","authDomain":"...",...}';
     window.__app_id = 'your-app-id';
     window.__initial_auth_token = 'optional-token';
   </script>
   ```

2. **Environment Variables** (Development):
   Create a `.env` file:
   ```env
   VITE_FIREBASE_CONFIG={"apiKey":"...","authDomain":"...",...}
   VITE_APP_ID=your-app-id
   VITE_INITIAL_AUTH_TOKEN=optional-token
   ```

---

## 📁 Project Structure

```
src/
├── components/      # React components
│   ├── EditorView.tsx      # Story editor with MPS slider
│   ├── ReaderView.tsx      # Cinematic story reader
│   ├── LibraryView.tsx      # User's story library
│   ├── MarketView.tsx      # Marketplace with privacy blur
│   ├── LegacyModal.tsx     # Gold membership activation
│   └── Navigation.tsx      # Top navigation bar
├── hooks/          # Custom React hooks
│   ├── useAuth.ts          # Firebase authentication
│   ├── useUserData.ts      # User profile management
│   └── useStory.ts         # Story data with MPS logic
├── lib/            # Utilities and configurations
│   ├── firebase.ts         # Firebase initialization
│   └── constants.ts        # Design tokens (filters, transitions)
├── types/          # TypeScript definitions
│   └── index.ts            # Story, UserData, etc.
├── App.tsx         # Main application component
├── main.tsx        # Application entry point
└── index.css       # Global styles with Tailwind
```

---

## 🎯 Key Features

### 1. MPS Logic (Memories Per Story)
- Stories support 1-10 memories per story
- Controlled via slider in EditorView
- Enforces dynamic story cycling

### 2. Dreamy Privacy Filters
- CSS blur filters for marketplace photos
- Protects identities while preserving memories
- Multiple filter options: Dreamy, Vintage, Art, Sketch

### 3. Marketplace Economy
- 50/50 Revenue Split (Creator/Platform)
- Pocket Coins system
- Purchase flow (stubbed, ready for implementation)

### 4. Legacy Lock
- Gold Membership requires proof of child's financial gain
- Legacy verification modal
- Unlocks premium branding and design tools

### 5. Premium UI
- Glassmorphism effects
- Cinematic ReaderView with teleprompter scrolling
- Dashboard with stats and visual pizzazz

---

## 🛡️ Safety Protocol

- **AI Safety**: Hard-coded rejection of violence, cursing, adult themes
- **Visual Privacy**: "Dreamy Blur" filter encouraged for public photos
- **G-Rated**: All content must be family-friendly

---

## 📋 Development Roadmap

See `PROJECT_STATE.md` for the living roadmap and current status.

**Current Status**: Phase 1-4 Complete ✅ | Phase 5 (PWA + Deployment) Pending

---

## 🧠 The Origami Protocol

This project uses `PROJECT_STATE.md` as the Agent's long-term memory. After every task, the roadmap is "refolded" based on real-world results.

**Self-Healing**: The project evaluates success and updates the roadmap automatically.

**Drift Defense**: Before any command, the current state is verified to prevent "Shiny Object" hallucinations.

---

## 📝 License

ISC

---

*Created for Leif & Lewie. Never stop exploring.*

