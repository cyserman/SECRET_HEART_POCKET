import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const rootElement = document.getElementById('root');

if (!rootElement) {
    console.error("FATAL ERROR: Could not find element with id 'root'");
    document.body.innerHTML = "<h1 style='color:white'>CRITICAL ERROR: Root element missing. Check index.html</h1>";
} else {
    try {
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
        console.error("React Crash:", err);
        rootElement.innerHTML = `<div style="padding: 20px; color: red;">
          <h1>React Error</h1>
          <p>${err.message}</p>
          <pre>${err.stack}</pre>
        </div>`;
    }
}
