import { useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import AdminAnalytics from "../components/admin/AdminAnalytics";
import AdminVerifications from "../components/admin/AdminVerifications";
import AdminRedemptions from "../components/admin/AdminRedemptions";

export default function AdminView() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function check() {
      const user = auth.currentUser;
      if (!user) {
        setChecking(false);
        return;
      }
      try {
        const token = await user.getIdTokenResult();
        // For MVP development, we might skip the actual claim check if we can't easily set it, 
        // but the requirement is "custom claims guard".
        // Use logic: if (token.claims.admin) setIsAdmin(true);
        // For smoke testing purposes without setting claims, you might need a backdoor or just manually set the claim in Firebase Console.
        // We will strictly implement the guard.
        if (token.claims.admin) {
          setIsAdmin(true);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setChecking(false);
      }
    }
    check();
  }, []);

  if (checking) return <div className="p-10 text-white">Checking permissions...</div>;

  if (!isAdmin) {
    return (
      <div className="p-10 text-white">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p>You need admin privileges to view this area.</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-white/10 rounded hover:bg-white/20"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1221] text-white p-6 md:p-12">
      <h1 className="text-3xl font-serif font-bold mb-8">Admin Dashboard</h1>
      
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4 text-white/70 uppercase tracking-widest text-xs">Platform Health</h2>
        <AdminAnalytics />
      </section>

      <div className="grid md:grid-cols-2 gap-12">
        <section>
          <AdminVerifications />
        </section>
        <section>
          <AdminRedemptions />
        </section>
      </div>
    </div>
  );
}
