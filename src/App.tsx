import { Routes, Route, Navigate } from "react-router-dom";
import HomeView from "./views/HomeView";
import ReaderView from "./views/ReaderView";
import CreateView from "./views/CreateView";
import LibraryView from "./views/LibraryView";
import MarketView from "./views/MarketView";
import CirclesView from "./views/CirclesView";
import ProfileView from "./views/ProfileView";
import AdminView from "./views/AdminView";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/story/:id" element={<ReaderView />} />
      <Route path="/create" element={<CreateView />} />
      <Route path="/library" element={<LibraryView />} />
      <Route path="/market" element={<MarketView />} />
      <Route path="/circles" element={<CirclesView />} />
      <Route path="/profile" element={<ProfileView />} />
      <Route path="/admin" element={<AdminView />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
