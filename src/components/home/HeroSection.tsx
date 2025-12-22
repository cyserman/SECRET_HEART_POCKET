export default function HeroSection({ onCreate, onBrowse }: { onCreate: () => void; onBrowse: () => void }) {
  return (
    <section className="text-center px-6 max-w-2xl mx-auto mt-12 mb-16">
      <div className="mx-auto mb-6 flex w-full items-center justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 backdrop-blur-sm bg-white/5">
          <span className="text-xs uppercase tracking-wider text-neutral-200 font-medium">
            Your story library awaits
          </span>
        </div>
      </div>

      <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
        Start Creating Memories
      </h1>
      <p className="text-neutral-300 text-base md:text-lg mb-8 leading-relaxed max-w-lg mx-auto">
        Capture your family&apos;s precious moments. Share stories with loved ones or keep them private
        in your secret heart pocket.
      </p>

      <div className="flex flex-col gap-3 max-w-xs mx-auto">
        <button
          onClick={onCreate}
          className="w-full bg-gradient-to-b from-gray-100 to-gray-300 hover:from-white hover:to-gray-200 text-gray-900 font-bold py-3 px-6 rounded-md shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Create Your First Story
        </button>
        <button
          onClick={onBrowse}
          className="w-full bg-gradient-to-b from-gray-200 to-gray-400 hover:from-gray-100 hover:to-gray-300 text-gray-900 font-semibold py-3 px-6 rounded-md shadow transition-all active:scale-[0.98]"
        >
          Browse the Market
        </button>
      </div>
    </section>
  );
}
