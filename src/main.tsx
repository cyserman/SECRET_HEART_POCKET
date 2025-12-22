import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./index.css";
import { bootstrapAuth } from "./lib/authBootstrap";

const qc = new QueryClient();

function Root() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    bootstrapAuth().then(() => setReady(true));
  }, []);

  if (!ready) return <div className="min-h-screen bg-[#0B1221] text-white flex items-center justify-center">Loading Secret Heart...</div>;

  return (
    <React.StrictMode>
      <QueryClientProvider client={qc}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<Root />);
