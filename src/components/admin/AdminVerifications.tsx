import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function AdminVerifications() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-verifications"],
    queryFn: async () => {
      const q = query(
        collection(db, "verifications"),
        where("status", "==", "pending"),
        orderBy("createdAt", "desc")
      );
      const snap = await getDocs(q);
      return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    },
  });

  if (isLoading) return <div>Loading verifications...</div>;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold font-serif text-white">Pending Verifications</h3>
      {!data?.length && <div className="text-white/50 italic">No pending requests.</div>}
      
      {data?.map((v: any) => (
        <div key={v.id} className="bg-[#1a2333] p-4 rounded-xl border border-white/5 flex justify-between items-center">
          <div>
            <div className="text-sm text-white font-bold">{v.uid}</div>
            <div className="text-xs text-neutral-400">Proof: {v.proofType}</div>
          </div>
          <div className="flex gap-2">
            <button className="bg-green-600 hover:bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded">
              Approve
            </button>
            <button className="bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded">
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
