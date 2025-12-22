const stories = [
  { tag: "Adventure", title: "The Lost Teddy Bear", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop" },
  { tag: "Family", title: "Backyard Camping", img: "https://images.unsplash.com/photo-1606092195730-5d7b9af1ef4d?q=80&w=800&auto=format&fit=crop" },
  { tag: "Fairytale", title: "Princess of the Moon", img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop" },
  { tag: "Nature", title: "Mountain Whispers", img: "https://images.unsplash.com/photo-1476900966873-12c4428b5bf1?q=80&w=800&auto=format&fit=crop" },
  { tag: "Memories", title: "First Day of Spring", img: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=800&auto=format&fit=crop" },
  { tag: "Art", title: "My Colorful World", img: "https://images.unsplash.com/photo-1459369510627-9efbee1e6051?q=80&w=800&auto=format&fit=crop" },
];

export default function CommunityStories() {
  return (
    <section className="px-6 mb-20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif font-bold text-white">Community Stories</h2>
        <a href="/market" className="text-sm text-blue-300 hover:text-white transition">
          View All
        </a>
      </div>

      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {stories.map((s) => (
          <div key={s.title} className="break-inside-avoid relative group rounded-xl overflow-hidden bg-white/5 ring-1 ring-white/10">
            <img
              src={s.img}
              alt={s.title}
              className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition duration-500"
              style={{ filter: "blur(18px) saturate(0.85) contrast(0.9)", transform: "translateZ(0)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <span className="text-xs font-bold text-blue-300 uppercase block mb-1">{s.tag}</span>
              <h3 className="text-sm font-bold text-white leading-tight">{s.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
