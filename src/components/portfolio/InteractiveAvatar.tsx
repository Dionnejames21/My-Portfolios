import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { avatarRespond, GREETING, type AvatarReply } from "../../lib/avatar-knowledge";
import { trackAvatarLeadSubmission } from "../../lib/contact-tracking";

/**
 * Interactive AI avatar — James's digital representative.
 *
 * HONEST SCOPE: This environment has no backend LLM endpoint and no real-time
 * lip-synced talking-head video provider (e.g. HeyGen) connected. So this is
 * implemented as a genuine, working conversational experience using the
 * browser-native APIs that ARE available:
 *   - SpeechSynthesis (male voice) — the avatar speaks responses aloud.
 *   - SpeechRecognition (microphone) — visitors can ask questions by voice.
 *   - Text input — reliable fallback when mic/permissions are unavailable.
 *   - A grounded, rule-based response engine (avatar-knowledge) that only
 *     answers from James's real portfolio data and admits when it doesn't know.
 *
 * The avatar visual is the professional profile photo with ambient "speaking"
 * animation (pulsing glow + equalizer + subtle float) to convey the active
 * speaking state — it is NOT a lip-synced talking-head video. To upgrade to a
 * true real-time talking avatar, connect a provider like HeyGen LiveAvatar
 * (requires an API key + a hosted avatar photo/video) — see the note at the
 * bottom of this file.
 */

const profilePhoto =
  "https://vibe.filesafe.space/1793286545658653540/attachments/5cb943a8-7d31-46d6-86a5-826481d7385a.jpg";

// Male voice preference — explicit masculine names first, and we explicitly
// AVOID known female-named voices so the browser can't fall back to a female.
const MALE_HINTS = [
  "daniel",
  "alex",
  "fred",
  "david",
  "mark",
  "james",
  "george",
  "rishi",
  "gordon",
  "reed",
  "male",
  "man",
];
const FEMALE_AVOID = [
  "samantha",
  "aria",
  "jenny",
  "zira",
  "karen",
  "moira",
  "fiona",
  "serena",
  "victoria",
  "susan",
  "tessa",
  "veena",
  "female",
  "woman",
];

function pickMaleVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  const en = voices.filter((v) => /^en/i.test(v.lang));
  const male = en.find((v) => MALE_HINTS.some((n) => v.name.toLowerCase().includes(n)));
  if (male) return male;
  const notFemale = en.find((v) => !FEMALE_AVOID.some((n) => v.name.toLowerCase().includes(n)));
  return notFemale || en[0] || voices[0];
}

type Phase = "idle" | "listening" | "thinking" | "speaking" | "lead" | "ended";

type Msg = { role: "visitor" | "avatar"; text: string };

export function InteractiveAvatar() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [muted, setMuted] = useState(false);
  const [transcript, setTranscript] = useState<Msg[]>([]);
  const [interim, setInterim] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [recognitionSupported, setRecognitionSupported] = useState(false);
  const [active, setActive] = useState(false); // panel opened

  const mutedRef = useRef(false);
  const phaseRef = useRef<Phase>("idle");
  const recognitionRef = useRef<any>(null);
  const transcriptEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // Feature detection (browser only).
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("speechSynthesis" in window) {
      setSpeechSupported(true);
      const load = () => {
        const v = window.speechSynthesis.getVoices();
        if (v.length) setVoices(v);
      };
      load();
      window.speechSynthesis.onvoiceschanged = load;
    }
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SR) setRecognitionSupported(true);
  }, []);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [transcript, interim, phase]);

  const stopSpeech = useCallback(() => {
    if (!speechSupported) return;
    try {
      window.speechSynthesis.cancel();
    } catch {}
  }, [speechSupported]);

  const stopListening = useCallback(() => {
    try {
      recognitionRef.current?.stop();
    } catch {}
    recognitionRef.current = null;
  }, []);

  const speak = useCallback(
    (text: string, onDone?: () => void) => {
      if (!speechSupported) {
        onDone?.();
        return;
      }
      stopSpeech();
      const u = new SpeechSynthesisUtterance(text);
      const v = pickMaleVoice(voices);
      if (v) u.voice = v;
      u.rate = 0.98;
      u.pitch = 0.9; // natural male register
      u.volume = mutedRef.current ? 0 : 1;
      u.onend = () => onDone?.();
      u.onerror = () => onDone?.();
      window.speechSynthesis.speak(u);
    },
    [speechSupported, voices, stopSpeech],
  );

  const handleReply = useCallback(
    (reply: AvatarReply) => {
      setTranscript((t) => [...t, { role: "avatar", text: reply.text }]);
      setPhase("speaking");
      speak(reply.text, () => {
        setPhase((p) => (p === "speaking" ? "idle" : p));
      });
    },
    [speak],
  );

  const startConversation = useCallback(() => {
    setActive(true);
    if (transcript.length === 0) {
      setTranscript([{ role: "avatar", text: GREETING.text }]);
      setPhase("speaking");
      speak(GREETING.text, () => setPhase("idle"));
    }
  }, [transcript.length, speak]);

  const submitText = useCallback(
    (text: string) => {
      const clean = text.trim();
      if (!clean) return;
      setError(null);
      setTranscript((t) => [...t, { role: "visitor", text: clean }]);
      setInput("");
      setPhase("thinking");
      stopListening();
      // Small natural thinking pause.
      window.setTimeout(() => {
        const reply = avatarRespond(clean);
        if (/hire|work with|start|engage|book/.test(clean.toLowerCase())) {
          handleLeadFlow(reply);
        } else {
          handleReply(reply);
        }
      }, 550);
    },
    [stopListening, handleReply],
  );

  // ---- Lead capture flow ----
  const [leadStep, setLeadStep] = useState<"name" | "email" | "service" | "done">("name");
  const [lead, setLead] = useState({ name: "", email: "", service: "" });
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSaved, setLeadSaved] = useState<boolean | null>(null);

  const handleLeadFlow = useCallback(
    (reply: AvatarReply) => {
      handleReply(reply);
      setLeadStep("name");
      setPhase("lead");
    },
    [handleReply],
  );

  const submitLeadField = useCallback(
    async (value: string) => {
      const v = value.trim();
      if (!v) return;
      setError(null);
      if (leadStep === "name") {
        setLead((l) => ({ ...l, name: v }));
        setTranscript((t) => [...t, { role: "visitor", text: v }]);
        setLeadStep("email");
        setPhase("speaking");
        speak("Thanks. What's the best email to reach you on?", () => setPhase("lead"));
      } else if (leadStep === "email") {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
          setError("Please enter a valid email address.");
          return;
        }
        setLead((l) => ({ ...l, email: v }));
        setTranscript((t) => [...t, { role: "visitor", text: v }]);
        setLeadStep("service");
        setPhase("speaking");
        speak(
          "Perfect. Which service are you most interested in — CRM setup, workflow automation, a landing page, or virtual assistance?",
          () => setPhase("lead"),
        );
      } else if (leadStep === "service") {
        setLead((l) => ({ ...l, service: v }));
        setTranscript((t) => [...t, { role: "visitor", text: v }]);
        setLeadSubmitting(true);
        setPhase("speaking");
        speak("Got it. Let me send that through now.", () => setPhase("thinking"));
        const ok = await trackAvatarLeadSubmission({
          firstName: lead.name,
          email: lead.email,
          serviceInterest: v,
        });
        setLeadSaved(ok);
        setLeadSubmitting(false);
        setLeadStep("done");
        setPhase("speaking");
        speak(
          ok
            ? "All set. I'll follow up with you personally by email. Thanks for reaching out — is there anything else I can help with?"
            : "I couldn't confirm the save on my end, so please also drop me a message through the Contact section to be safe. Anything else?",
          () => setPhase("idle"),
        );
      }
    },
    [leadStep, lead.name, lead.email, speak],
  );

  // ---- Microphone (SpeechRecognition) ----
  const startListening = useCallback(() => {
    if (!recognitionSupported) return;
    stopSpeech();
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const rec = new SR();
    rec.lang = "en-US";
    rec.interimResults = true;
    rec.continuous = false;
    rec.onresult = (e: any) => {
      let interimText = "";
      let finalText = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) finalText += r[0].transcript;
        else interimText += r[0].transcript;
      }
      setInterim(interimText);
      if (finalText) {
        setInterim("");
        submitText(finalText);
      }
    };
    rec.onerror = (e: any) => {
      if (e?.error === "not-allowed" || e?.error === "permission-denied") {
        setError("Microphone permission was blocked. You can still type your question.");
      } else {
        setError("I couldn't catch that. Try typing your question instead.");
      }
      setPhase("idle");
    };
    rec.onend = () => {
      if (phaseRef.current === "listening") setPhase("idle");
    };
    recognitionRef.current = rec;
    setPhase("listening");
    try {
      rec.start();
    } catch {
      setPhase("idle");
    }
  }, [recognitionSupported, stopSpeech, submitText]);

  const endConversation = useCallback(() => {
    stopSpeech();
    stopListening();
    setPhase("ended");
    speak("Thanks for chatting. Reach out anytime through the Contact section. Talk soon!");
  }, [stopSpeech, stopListening, speak]);

  const restart = useCallback(() => {
    stopSpeech();
    stopListening();
    setTranscript([]);
    setInterim("");
    setInput("");
    setError(null);
    setLead({ name: "", email: "", service: "" });
    setLeadStep("name");
    setLeadSaved(null);
    setPhase("idle");
    setTranscript([{ role: "avatar", text: GREETING.text }]);
    setPhase("speaking");
    speak(GREETING.text, () => setPhase("idle"));
  }, [stopSpeech, stopListening, speak]);

  const isSpeaking = phase === "speaking" || phase === "thinking";
  const suggestions = useMemo<AvatarReply["suggestions"]>(() => {
    if (phase === "lead") return undefined;
    return [
      "What do you do?",
      "Show me your websites",
      "GoHighLevel services",
      "How do I hire you?",
    ];
  }, [phase]);

  return (
    <Reveal className="mt-6">
      <div className="rounded-3xl border border-border bg-card/70 p-6 shadow-lg shadow-navy/10 backdrop-blur sm:p-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
          {/* Avatar visual + status */}
          <div className="flex shrink-0 flex-col items-center lg:w-56">
            <div className="relative grid h-44 w-44 place-items-center sm:h-52 sm:w-52">
              <div
                className={`pointer-events-none absolute inset-0 rounded-full ${
                  isSpeaking ? "avatar-glow-fast" : "avatar-glow"
                }`}
              />
              <div
                className={`pointer-events-none absolute -inset-1 rounded-full border-2 border-dashed border-brand/35 ${
                  isSpeaking ? "avatar-ring-spin" : ""
                }`}
              />
              <img
                src={profilePhoto}
                alt="James — interactive AI avatar representative"
                className={`relative h-40 w-40 rounded-full border-2 border-brand/50 object-cover object-top shadow-xl shadow-navy-deep/60 sm:h-48 sm:w-48 ${
                  phase === "idle" ? "avatar-float" : ""
                }`}
              />
              {isSpeaking && (
                <div className="absolute -bottom-1 left-1/2 flex -translate-x-1//2 items-end gap-1 rounded-full bg-navy-deep/80 px-2 py-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span
                      key={i}
                      className="animate-eq-bar block h-3 w-1 rounded-full bg-brand"
                      style={{ animationDelay: `${i * 0.12}s` }}
                    />
                  ))}
                </div>
              )}
            </div>
            <StatusPill phase={phase} />
          </div>

          {/* Conversation panel */}
          <div className="w-full flex-1">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-display text-lg font-bold text-foreground sm:text-xl">
                  Talk to my AI representative
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Ask about my GoHighLevel services, my 98 website projects, or how to get in touch.
                </p>
              </div>
              {!active ? (
                <button
                  type="button"
                  onClick={startConversation}
                  disabled={!speechSupported}
                  className="cta-glow cta-glow-hover inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-brand-foreground shadow-lg shadow-brand/25 transition-colors hover:bg-brand-bright disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <PlayIcon /> Talk to My AI Avatar
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <IconBtn
                    label={muted ? "Unmute" : "Mute"}
                    onClick={() => setMuted((m) => !m)}
                    active={muted}
                  >
                    {muted ? <MuteIcon /> : <VolumeIcon />}
                  </IconBtn>
                  <IconBtn label="End conversation" onClick={endConversation}>
                    <EndIcon />
                  </IconBtn>
                  <IconBtn label="Restart" onClick={restart}>
                    <ReplayIcon />
                  </IconBtn>
                </div>
              )}
            </div>

            {!speechSupported && (
              <p className="mt-3 rounded-xl border border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
                Voice playback isn't available in this browser, but you can still type your
                questions and read the replies.
              </p>
            )}

            {active && (
              <>
                {/* Transcript */}
                <div className="mt-5 max-h-72 space-y-3 overflow-y-auto rounded-2xl border border-border bg-navy-deep/40 p-4">
                  {transcript.map((m, i) => (
                    <div
                      key={i}
                      className={`flex ${m.role === "visitor" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                          m.role === "visitor"
                            ? "bg-brand/20 text-foreground"
                            : "bg-muted/50 text-foreground"
                        }`}
                      >
                        <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                          {m.role === "visitor" ? "You" : "James AI"}
                        </span>
                        {m.text}
                      </div>
                    </div>
                  ))}
                  {interim && (
                    <div className="flex justify-end">
                      <div className="max-w-[85%] rounded-2xl bg-brand/10 px-3.5 py-2.5 text-sm italic text-muted-foreground">
                        {interim}…
                      </div>
                    </div>
                  )}
                  {phase === "thinking" && (
                    <div className="flex justify-start">
                      <div className="rounded-2xl bg-muted/50 px-3.5 py-2.5 text-sm text-muted-foreground">
                        <span className="inline-flex gap-1">
                          <Dot /> <Dot d={0.15} /> <Dot d={0.3} />
                        </span>
                      </div>
                    </div>
                  )}
                  <div ref={transcriptEndRef} />
                </div>

                {/* Lead capture inline form */}
                {phase === "lead" && leadStep !== "done" && (
                  <LeadForm
                    step={leadStep}
                    submitting={leadSubmitting}
                    onSubmit={submitLeadField}
                    error={error}
                  />
                )}
                {phase === "lead" && leadStep === "done" && leadSaved !== null && (
                  <p
                    className={`mt-3 rounded-xl px-3 py-2 text-xs ${
                      leadSaved
                        ? "border border-brand/30 bg-brand/10 text-brand"
                        : "border border-amber-400/30 bg-amber-400/10 text-amber-200"
                    }`}
                  >
                    {leadSaved
                      ? "Lead captured — I'll follow up by email. You can also use the Contact section or WhatsApp."
                      : "I couldn't confirm the save. Please also message me through the Contact section to be safe."}
                  </p>
                )}

                {/* Quick suggestions */}
                {suggestions && phase !== "lead" && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => submitText(s)}
                        className="rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-brand/50 hover:text-brand"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input row: mic + text */}
                <form
                  className="mt-4 flex items-center gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (phase === "lead") submitLeadField(input);
                    else submitText(input);
                  }}
                >
                  {recognitionSupported && (
                    <button
                      type="button"
                      onClick={phase === "listening" ? stopListening : startListening}
                      aria-label={phase === "listening" ? "Stop listening" : "Speak your question"}
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border transition-colors ${
                        phase === "listening"
                          ? "border-brand bg-brand/20 text-brand animate-pulse"
                          : "border-border bg-muted/50 text-foreground hover:border-brand/50 hover:text-brand"
                      }`}
                    >
                      <MicIcon />
                    </button>
                  )}
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={
                      phase === "lead"
                        ? leadStep === "name"
                          ? "Type your name…"
                          : leadStep === "email"
                            ? "Type your email…"
                            : "Type the service you need…"
                        : "Type your question…"
                    }
                    className="min-w-0 flex-1 rounded-xl border border-border bg-muted/40 px-3.5 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-brand"
                  />
                  <button
                    type="submit"
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand text-brand-foreground transition-colors hover:bg-brand-bright"
                    aria-label="Send"
                  >
                    <SendIcon />
                  </button>
                </form>
                {error && phase !== "lead" && (
                  <p className="mt-2 text-xs text-amber-300">{error}</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ---------- small presentational helpers ---------- */

function StatusPill({ phase }: { phase: Phase }) {
  const map: Record<Phase, { label: string; dot: string }> = {
    idle: { label: "Ready", dot: "bg-muted-foreground" },
    listening: { label: "Listening", dot: "bg-brand animate-pulse" },
    thinking: { label: "Thinking", dot: "bg-violet animate-pulse" },
    speaking: { label: "Speaking", dot: "bg-brand animate-pulse" },
    lead: { label: "Capturing lead", dot: "bg-violet animate-pulse" },
    ended: { label: "Conversation ended", dot: "bg-muted-foreground" },
  };
  const s = map[phase];
  return (
    <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs font-semibold text-foreground">
      <span className={`h-2 w-2 rounded-full ${s.dot}`} />
      {s.label}
    </div>
  );
}

function LeadForm({
  step,
  submitting,
  onSubmit,
  error,
}: {
  step: "name" | "email" | "service" | "done";
  submitting: boolean;
  onSubmit: (v: string) => void;
  error: string | null;
}) {
  const [val, setVal] = useState("");
  const label =
    step === "name" ? "Your name" : step === "email" ? "Your email" : "Service you need";
  const type = step === "email" ? "email" : "text";
  return (
    <form
      className="mt-3 flex flex-col gap-2 rounded-2xl border border-brand/30 bg-brand/5 p-3 sm:flex-row sm:items-center"
      onSubmit={(e) => {
        e.preventDefault();
        if (!submitting) onSubmit(val);
        setVal("");
      }}
    >
      <label className="flex-1">
        <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-brand">
          {label}
        </span>
        <input
          type={type}
          required
          value={val}
          onChange={(e) => setVal(e.target.value)}
          className="w-full rounded-lg border border-border bg-navy-deep/60 px-3 py-2 text-sm text-foreground outline-none focus:border-brand"
        />
      </label>
      <button
        type="submit"
        disabled={submitting}
        className="mt-3 rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-brand-foreground transition-colors hover:bg-brand-bright disabled:opacity-60 sm:mt-0"
      >
        {submitting ? "Saving…" : "Send"}
      </button>
      {error && <p className="text-xs text-amber-300 sm:mt-0">{error}</p>}
    </form>
  );
}

function IconBtn({
  label,
  onClick,
  active = false,
  children,
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`grid h-11 w-11 place-items-center rounded-xl border transition-colors ${
        active
          ? "border-brand bg-brand/20 text-brand"
          : "border-border bg-muted/50 text-foreground hover:border-brand/50 hover:text-brand"
      }`}
    >
      {children}
    </button>
  );
}

function Dot({ d = 0 }: { d?: number }) {
  return (
    <span
      className="inline-block h-2 w-2 animate-bounce rounded-full bg-brand"
      style={{ animationDelay: `${d}s` }}
    />
  );
}

/* icons */
function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
function MicIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0M12 19v3" />
    </svg>
  );
}
function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M3 3l18 9-18 9 4-9-4-9z" />
    </svg>
  );
}
function EndIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
function ReplayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}
function VolumeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M11 5 6 9H3v6h3l5 4z" />
      <path d="M16 9a4 4 0 0 1 0 6" />
    </svg>
  );
}
function MuteIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M11 5 6 9H3v6h3l5 4z" />
      <path d="m16 9 5 6M21 9l-5 6" />
    </svg>
  );
}

/*
 * UPCOMRADE PATH — true real-time lip-synced talking avatar:
 * Replace the photo + SpeechSynthesis path with a provider such as HeyGen
 * LiveAvatar (interactive streaming avatar). That requires:
 *   1. A HeyGen account + an interactive avatar (uploaded photo/video).
 *   2. A server-side endpoint that holds the HeyGen API key and issues a
 *      short-lived streaming session token (the secret never reaches the
 *      browser).
 *   3. The HeyGen web SDK + mic stream piped to the avatar session.
 * Until those are connected, this component is the honest, working
 * conversational representative using browser-native APIs only.
 */
