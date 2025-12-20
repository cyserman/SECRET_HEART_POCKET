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
        ReactDOM.createRoot(rootElement).render(
          <React.StrictMode>
            <App />
          </React.StrictMode>,
        )
        console.log("React Mounted Successfully");
    } catch (err) {
        console.error("React Crash:", err);
    }
}
