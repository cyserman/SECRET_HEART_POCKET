import { useEffect, useMemo, useRef, useState } from "react";

type DictationState = {
  supported: boolean;
  listening: boolean;
  transcript: string;
  error: string | null;
};

type UseDictationArgs = {
  lang?: string; // e.g. "en-US"
  interimResults?: boolean;
};

export function useDictation(args: UseDictationArgs = {}) {
  const lang = args.lang ?? "en-US";
  const interimResults = args.interimResults ?? true;

  const recognitionRef = useRef<any>(null);

  const [state, setState] = useState<DictationState>({
    supported: false,
    listening: false,
    transcript: "",
    error: null,
  });

  const SpeechRecognitionCtor = useMemo(() => {
    const w = window as any;
    return w.SpeechRecognition || w.webkitSpeechRecognition || null;
  }, []);

  useEffect(() => {
    if (!SpeechRecognitionCtor) {
      setState((s) => ({ ...s, supported: false }));
      return;
    }
    setState((s) => ({ ...s, supported: true }));

    const rec = new SpeechRecognitionCtor();
    rec.lang = lang;
    rec.interimResults = interimResults;
    rec.continuous = true;

    rec.onstart = () => setState((s) => ({ ...s, listening: true, error: null }));
    rec.onend = () => setState((s) => ({ ...s, listening: false }));
    rec.onerror = (e: any) => setState((s) => ({ ...s, error: e?.error ?? "Dictation error" }));

    rec.onresult = (event: any) => {
      let full = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        full += event.results[i][0].transcript;
      }
      setState((s) => ({ ...s, transcript: full }));
    };

    recognitionRef.current = rec;

    return () => {
      try {
        rec.stop();
      } catch {}
      recognitionRef.current = null;
    };
  }, [SpeechRecognitionCtor, lang, interimResults]);

  const start = () => {
    const rec = recognitionRef.current;
    if (!rec) return;
    setState((s) => ({ ...s, transcript: "", error: null }));
    try {
      rec.start();
    } catch (e: any) {
      // Some browsers throw if start called twice
      setState((s) => ({ ...s, error: e?.message ?? "Could not start dictation" }));
    }
  };

  const stop = () => {
    const rec = recognitionRef.current;
    if (!rec) return;
    try {
      rec.stop();
    } catch {}
  };

  return { ...state, start, stop };
}

