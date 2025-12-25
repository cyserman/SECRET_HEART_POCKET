import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { initAuth } from './lib/authBootstrap'
import { seedDefaultHeartPocketStory } from './lib/seedDefaultStories'

async function boot() {
  try {
    // Initialize anonymous authentication
    await initAuth();
    
    // Seed default story (idempotent - only creates if missing)
    await seedDefaultHeartPocketStory();
    
    const rootElement = document.getElementById('root');
    
    if (!rootElement) {
      console.error("FATAL ERROR: Could not find element with id 'root'");
      document.body.innerHTML = "<h1 style='color:white'>CRITICAL ERROR: Root element missing. Check index.html</h1>";
      return;
    }
    
    // Clear any existing content in root to prevent hydration issues
    rootElement.innerHTML = '';
    
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("React Mounted Successfully");
  } catch (err) {
    console.error("Boot failed:", err);
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.innerHTML = `<div style="padding: 20px; color: red; font-family: system-ui;">
        <h1>Boot failed</h1>
        <pre>${String(err?.message ?? err)}</pre>
      </div>`;
    }
  }
}

boot();
