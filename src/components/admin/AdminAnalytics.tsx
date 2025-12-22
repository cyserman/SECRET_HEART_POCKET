import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function AdminAnalytics() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-analytics"],
    queryFn: async () => {
      const snap = await getDoc(doc(db, "platform", "balances"));
      return snap.exists() ? snap.data() : null;
    },
  });

  if (isLoading) return <div>Loading analytics...</div>;
  if (!data) return <div className="text-white/50">No platform data yet.</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <Card label="Total Coins Spent" value={data.purchasesCount ?? 0} />
      <Card label="Creator Payouts" value={data.creatorCoinsPaid ?? 0} />
      <Card label="Platform Revenue" value={data.platformCoinsEarned ?? 0} />
      <Card label="Lifetime Raised" value={`$${((data.lifetimeRaisedCents ?? 0) / 100).toFixed(2)}`} />
    </div>
  );
}

function Card({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-[#1a2333] p-4 rounded-xl border border-white/5">
      <div className="text-neutral-400 text-xs uppercase font-bold mb-1">{label}</div>
      <div className="text-2xl font-serif font-bold text-white">{value}</div>
    </div>
  );
}
