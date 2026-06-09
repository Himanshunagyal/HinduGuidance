import { useState, useRef, useEffect } from 'react';
import OnboardingModal from './OnboardingModal';

const SUGGESTED_QUESTIONS = [
  "When is the next Ekadashi vrat?",
  "What can I eat during Navratri fast?",
  "How to perform Pradosh puja at home?",
  "Can diabetics observe Ekadashi fast?",
  "What is the best muhurat for marriage in 2026?",
  "How to do Ganesh puja for the first time?",
];

export default function PanditChat() {
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  // Fetch profile on mount
  useEffect(() => {
    fetch('/api/profile-get')
      .then(r => r.json())
      .then(({ profile }) => {
        setProfile(profile);
        setMessages([getWelcomeMessage(profile)]);
      })
      .catch(() => {
        setMessages([getWelcomeMessage(null)]);
      })
      .finally(() => setProfileLoading(false));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  function getWelcomeMessage(profile) {
    if (profile?.name) {
      return {
        role: 'assistant',
        content: `Pranam, ${profile.name}! 🙏\n\nI am Pandit Shivananda. It is good to have you back on your dharmic path.\n\nHow may I guide you today?`
      };
    }
    return {
      role: 'assistant',
      content: 'Pranam, Vatsa! 🙏\n\nI am Pandit Shivananda. I am here to guide you on your dharmic path — whether it be vrat rules, puja vidhi, mantra meanings, or auspicious timings.\n\nHow may I serve you today?'
    };
  }

  const handleOnboardingComplete = (newProfile) => {
    setProfile(newProfile);
    setMessages([getWelcomeMessage(newProfile)]);
  };

  const sendMessage = async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg || loading) return;

    setInput('');
    const newMessages = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch('/api/pandit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content }))
        })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply || 'Pranam! Please try again.' }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'I apologize, Vatsa. There seems to be a disturbance. Please try again in a moment.' }]);
    } finally {
      setLoading(false);
    }
  };

  // Don't render until profile check is done
  if (profileLoading) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="card-sacred rounded-sm h-32 flex items-center justify-center">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 bg-saffron-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
            <div className="w-2 h-2 bg-saffron-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
            <div className="w-2 h-2 bg-saffron-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Show onboarding if no profile */}
      {!profile && (
        <OnboardingModal onComplete={handleOnboardingComplete} />
      )}

      <div className="max-w-3xl mx-auto">
        <div className="card-sacred rounded-sm overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-darkbrown to-deepred p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-saffron-100 flex items-center justify-center text-2xl flex-shrink-0">
              🕉️
            </div>
            <div className="flex-1">
              <h2 className="font-display text-cream font-semibold text-lg">Pandit Shivananda</h2>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <p className="text-cream/60 text-xs font-sans">AI Vedic Guide • Available 24×7</p>
              </div>
            </div>
            <div className="text-right flex flex-col items-end gap-1">
              {profile?.name && (
                <span className="text-xs font-sans text-saffron-300 bg-white/10 px-2 py-0.5 rounded-full">
                  🙏 {profile.name}
                </span>
              )}
              <p className="text-cream/40 text-xs font-sans hidden sm:block">Dharmo Rakshati</p>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[480px] overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-cream/80 to-cream">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-saffron-100 flex items-center justify-center text-sm flex-shrink-0 mt-1">
                    🕉️
                  </div>
                )}
                <div className={`max-w-[80%] p-4 rounded-sm text-sm font-body leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'assistant'
                    ? 'chat-pandit text-darkbrown/85'
                    : 'chat-user text-darkbrown/85'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-saffron-100 flex items-center justify-center text-sm flex-shrink-0 mt-1">
                  🕉️
                </div>
                <div className="chat-pandit p-4 rounded-sm">
                  <div className="flex gap-1.5 items-center">
                    <div className="w-2 h-2 bg-saffron-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                    <div className="w-2 h-2 bg-saffron-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                    <div className="w-2 h-2 bg-saffron-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                    <span className="text-xs text-saffron-500 font-sans ml-2">Panditji is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggested questions — shown only on first load */}
          {messages.length <= 1 && (
            <div className="px-5 py-3 border-t border-gold/15 bg-saffron-50/30">
              <p className="text-xs font-sans text-darkbrown/50 mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS.slice(0, 4).map(q => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs font-sans text-saffron-700 bg-saffron-50 border border-saffron-200 px-3 py-1.5 rounded-full hover:bg-saffron-100 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gold/20 bg-white/50">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder={profile?.name ? `Ask Panditji, ${profile.name}...` : 'Ask Panditji about vrats, puja, muhurat...'}
                disabled={loading}
                className="flex-1 bg-cream border border-gold/30 rounded-sm px-4 py-3 text-sm font-body text-darkbrown placeholder-darkbrown/40 focus:outline-none focus:border-saffron-400 focus:ring-1 focus:ring-saffron-200 disabled:opacity-50"
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                className="bg-gradient-to-r from-saffron-500 to-saffron-600 text-white font-sans text-sm font-medium px-5 py-3 rounded-sm hover:from-saffron-600 hover:to-saffron-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                🙏 Ask
              </button>
            </div>
            <p className="text-xs text-darkbrown/30 font-sans mt-2 text-center">Guidance is offered in the spirit of dharma. Verify important decisions with a local pandit.</p>
          </div>
        </div>
      </div>
    </>
  );
}