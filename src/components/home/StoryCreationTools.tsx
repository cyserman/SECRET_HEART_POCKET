import { ImagePlus, Wand2, HeartHandshake } from "lucide-react";

const features = [
  { title: "Photo Uploading", desc: "Easily upload photos from your device to create visual storybooks that capture the moment.", Icon: ImagePlus },
  { title: "Easy Editing", desc: "Simple UI interface designed for everyone. Add captions, stickers, and arrange pages with drag-and-drop.", Icon: Wand2 },
  { title: "Share with Circles", desc: "Share stories instantly with your closed family circle or publish to the market for the world to see.", Icon: HeartHandshake },
];

export default function StoryCreationTools() {
  return (
    <section className="px-6 mb-24">
      <div className="bg-[#1a2333] rounded-2xl p-8 border border-white/5">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif font-bold text-white mb-3">Story Creation Tools</h2>
          <p className="text-neutral-400">Everything you need to bring your imagination to life.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map(({ title, desc, Icon }) => (
            <div key={title} className="bg-[#0B1221] p-6 rounded-xl border border-white/5 hover:border-white/20 transition group">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
              <p className="text-sm text-neutral-400">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
