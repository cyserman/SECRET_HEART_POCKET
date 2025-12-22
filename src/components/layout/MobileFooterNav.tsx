import { PlusSquare, BookOpen, Bell } from "lucide-react";

const Item = ({ href, label, Icon, active }: any) => (
  <a
    href={href}
    className={`flex flex-col items-center gap-1 ${
      active ? "text-white" : "text-neutral-400 hover:text-white"
    }`}
  >
    <Icon className="w-6 h-6" />
    <span className="text-[10px] font-medium">{label}</span>
  </a>
);

export default function MobileFooterNav() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0B1221] border-t border-white/10 p-4 flex justify-around items-center z-40 pb-6">
      <Item href="/create" label="Create" Icon={PlusSquare} active />
      <Item href="/library" label="Library" Icon={BookOpen} />
      <Item href="/alerts" label="Alerts" Icon={Bell} />
    </div>
  );
}
