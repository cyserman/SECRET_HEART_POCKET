import { useEffect } from "react";
import { Mic, MicOff } from "lucide-react";
import { useDictation } from "../hooks/useDictation";

export default function DictateButton({
  onAppend,
  onReplaceInterim,
  className = "",
  lang = "en-US",
}: {
  /** Called when dictation stops; we append transcript to textarea */
  onAppend: (text: string) => void;

  /** Called during listening; optional live preview behavior */
  onReplaceInterim?: (text: string) => void;

  className?: string;
  lang?: string;
}) {
  const { supported, listening, transcript, error, start, stop } = useDictation({
    lang,
    interimResults: true,
  });

  // optional interim preview
  useEffect(() => {
    if (!listening) return;
    if (!onReplaceInterim) return;
    onReplaceInterim(transcript);
  }, [listening, transcript, onReplaceInterim]);

  // When user stops, we append the final transcript
  const handleToggle = () => {
    if (!supported) return;
    if (listening) {
      stop();
      if (transcript.trim()) onAppend(transcript.trim());
    } else {
      start();
    }
  };

  return (
    <div className={className}>
      <button
        type="button"
        onClick={handleToggle}
        disabled={!supported}
        className={[
          "rounded-2xl px-4 py-3 font-extrabold shadow-md hover:shadow-lg active:scale-95 transition",
          supported
            ? listening
              ? "bg-rose-600 text-white"
              : "bg-indigo-600 text-white"
            : "bg-slate-300 text-slate-600 cursor-not-allowed",
          "flex items-center gap-2 justify-center w-full sm:w-auto",
        ].join(" ")}
        title={supported ? (listening ? "Stop dictation" : "Start dictation") : "Dictation not supported in this browser"}
      >
        {listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        {supported ? (listening ? "Stop dictation" : "Dictate") : "Dictation unavailable"}
      </button>

      {error && <div className="mt-2 text-xs text-rose-700 font-semibold">{error}</div>}
      {!supported && (
        <div className="mt-2 text-xs text-slate-500">
          Tip: Dictation works best in Chrome/Safari on desktop/mobile.
        </div>
      )}
    </div>
  );
}
