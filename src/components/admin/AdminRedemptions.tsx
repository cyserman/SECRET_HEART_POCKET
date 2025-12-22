import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function AdminRedemptions() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-redemptions"],
    queryFn: async () => {
      const q = query(
        collection(db, "redemptions"),
        where("status", "==", "pending"),
        orderBy("createdAt", "desc")
      );
      const snap = await getDocs(q);
      return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    },
  });

  if (isLoading) return <div>Loading redemptions...</div>;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold font-serif text-white">Pending Redemptions</h3>
      {!data?.length && <div className="text-white/50 italic">No pending redemptions.</div>}

      {data?.map((r: any) => (
        <div key={r.id} className="bg-[#1a2333] p-4 rounded-xl border border-white/5 flex justify-between items-center">
          <div>
            <div className="text-sm text-white font-bold">Item: {r.itemId}</div>
            <div className="text-xs text-neutral-400">User: {r.uid}</div>
            <div className="text-xs text-yellow-500">{r.coinCost} Coins</div>
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded">
            Fulfill
          </button>
        </div>
      ))}
    </div>
  );
}
