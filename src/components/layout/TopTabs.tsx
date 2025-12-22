import { Home, Users, ShoppingBag, UserCircle2 } from "lucide-react";

const Tab = ({ href, label, Icon, rightBorder }: any) => (
  <a
    href={href}
    className={[
      "flex-1 flex flex-col items-center justify-center py-2 hover:bg-gray-50",
      rightBorder ? "border-r border-gray-200" : "",
    ].join(" ")}
  >
    <Icon className="w-5 h-5 mb-0.5" />
    <span className="text-[10px] font-bold uppercase tracking-wide">{label}</span>
  </a>
);

export default function TopTabs() {
  return (
    <div className="flex border-t border-white/10 bg-white text-gray-900">
      <Tab href="/" label="Home" Icon={Home} rightBorder />
      <Tab href="/circles" label="Circles" Icon={Users} rightBorder />
      <Tab href="/market" label="Market" Icon={ShoppingBag} rightBorder />
      <Tab href="/profile" label="Profile" Icon={UserCircle2} />
    </div>
  );
}
