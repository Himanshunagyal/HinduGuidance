import { useState } from 'react';

const RASHIS = [
  { value: 'Mesha', label: 'Mesha (Aries) ♈' },
  { value: 'Vrishabha', label: 'Vrishabha (Taurus) ♉' },
  { value: 'Mithuna', label: 'Mithuna (Gemini) ♊' },
  { value: 'Karka', label: 'Karka (Cancer) ♋' },
  { value: 'Simha', label: 'Simha (Leo) ♌' },
  { value: 'Kanya', label: 'Kanya (Virgo) ♍' },
  { value: 'Tula', label: 'Tula (Libra) ♎' },
  { value: 'Vrishchika', label: 'Vrishchika (Scorpio) ♏' },
  { value: 'Dhanu', label: 'Dhanu (Sagittarius) ♐' },
  { value: 'Makara', label: 'Makara (Capricorn) ♑' },
  { value: 'Kumbha', label: 'Kumbha (Aquarius) ♒' },
  { value: 'Meena', label: 'Meena (Pisces) ♓' },
];

const INTENTIONS = [
  { value: 'spiritual_growth', label: '🕉️ Spiritual Growth & Sadhana' },
  { value: 'family_wellbeing', label: '🏠 Family Wellbeing & Harmony' },
  { value: 'health', label: '💚 Health & Healing' },
  { value: 'career_prosperity', label: '🌟 Career & Prosperity' },
  { value: 'marriage', label: '💛 Marriage & Relationships' },
  { value: 'general', label: '🙏 General Dharmic Guidance' },
];

export default function OnboardingModal({ onComplete }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [rashi, setRashi] = useState('');
  const [intention, setIntention] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleComplete = async () => {
    if (!name.trim() || !rashi || !intention) return;
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/profile-save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), rashi, intention }),
      });
      if (!res.ok) throw new Error('Save failed');
      onComplete({ name: name.trim(), rashi, intention });
    } catch {
      setError('Could not save your profile. Please try again.');
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(30,15,5,0.85)', backdropFilter: 'blur(6px)' }}>
      
      <div className="card-sacred w-full max-w-md overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-darkbrown to-deepred p-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 text-8xl flex items-center justify-center select-none pointer-events-none">
            🕉️
          </div>
          <div className="relative">
            <div className="text-4xl mb-2">🪔</div>
            <h2 className="font-display text-cream text-2xl font-semibold">
              Namaste, Vatsa
            </h2>
            <p className="text-cream/60 text-sm font-sans mt-1">
              Let Pandit Shivananda know you
            </p>
            {/* Step indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {[1, 2, 3].map(s => (
                <div key={s} className={`h-1 rounded-full transition-all duration-300 ${
                  s <= step ? 'bg-saffron-400 w-8' : 'bg-cream/20 w-4'
                }`} />
              ))}
            </div>
          </div>
        </div>

        <div className="p-6">

          {/* Step 1: Name */}
          {step === 1 && (
            <div>
              <p className="font-body text-darkbrown/70 text-sm mb-4 leading-relaxed">
                A pandit always begins by knowing the name of the devotee. What shall I call you?
              </p>
              <label className="block text-xs font-sans text-saffron-600 uppercase tracking-wide mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && name.trim() && setStep(2)}
                placeholder="e.g. Ravi, Priya, Arjun..."
                autoFocus
                className="w-full bg-cream border border-gold/30 rounded-sm px-4 py-3 text-sm font-body text-darkbrown placeholder-darkbrown/30 focus:outline-none focus:border-saffron-400 focus:ring-1 focus:ring-saffron-200"
              />
              <button
                onClick={() => name.trim() && setStep(2)}
                disabled={!name.trim()}
                className="w-full mt-4 bg-gradient-to-r from-saffron-500 to-saffron-600 text-white font-sans text-sm font-medium py-3 rounded-sm hover:from-saffron-600 hover:to-saffron-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue →
              </button>
            </div>
          )}

          {/* Step 2: Rashi */}
          {step === 2 && (
            <div>
              <p className="font-body text-darkbrown/70 text-sm mb-4 leading-relaxed">
                Pranam, <span className="text-darkbrown font-semibold">{name}</span>! Your Rashi (Moon Sign) helps me give you guidance aligned with the planets.
              </p>
              <label className="block text-xs font-sans text-saffron-600 uppercase tracking-wide mb-2">
                Your Rashi (Moon Sign)
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-52 overflow-y-auto pr-1">
                {RASHIS.map(r => (
                  <button
                    key={r.value}
                    onClick={() => setRashi(r.value)}
                    className={`text-left px-3 py-2.5 rounded-sm border text-xs font-sans transition-colors ${
                      rashi === r.value
                        ? 'border-saffron-400 bg-saffron-50 text-saffron-700 font-medium'
                        : 'border-gold/20 bg-cream/50 text-darkbrown/70 hover:border-saffron-200 hover:bg-saffron-50/50'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-darkbrown/40 font-sans mt-2">
                Don't know your Rashi? <a href="/pandit" className="text-saffron-500 hover:underline">Ask Panditji</a> after setup.
              </p>
              <div className="flex gap-3 mt-4">
                <button onClick={() => setStep(1)}
                  className="flex-1 border border-gold/30 text-darkbrown/60 font-sans text-sm py-2.5 rounded-sm hover:bg-saffron-50 transition-colors">
                  ← Back
                </button>
                <button
                  onClick={() => rashi && setStep(3)}
                  disabled={!rashi}
                  className="flex-1 bg-gradient-to-r from-saffron-500 to-saffron-600 text-white font-sans text-sm font-medium py-2.5 rounded-sm hover:from-saffron-600 hover:to-saffron-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Intention */}
          {step === 3 && (
            <div>
              <p className="font-body text-darkbrown/70 text-sm mb-4 leading-relaxed">
                What brings you to seek dharmic guidance, {name}?
              </p>
              <label className="block text-xs font-sans text-saffron-600 uppercase tracking-wide mb-2">
                Your Intention
              </label>
              <div className="space-y-2">
                {INTENTIONS.map(i => (
                  <button
                    key={i.value}
                    onClick={() => setIntention(i.value)}
                    className={`w-full text-left px-4 py-3 rounded-sm border text-sm font-sans transition-colors ${
                      intention === i.value
                        ? 'border-saffron-400 bg-saffron-50 text-saffron-700 font-medium'
                        : 'border-gold/20 bg-cream/50 text-darkbrown/70 hover:border-saffron-200 hover:bg-saffron-50/50'
                    }`}
                  >
                    {i.label}
                  </button>
                ))}
              </div>
              {error && <p className="text-red-500 text-xs font-sans mt-3">{error}</p>}
              <div className="flex gap-3 mt-4">
                <button onClick={() => setStep(2)}
                  className="flex-1 border border-gold/30 text-darkbrown/60 font-sans text-sm py-2.5 rounded-sm hover:bg-saffron-50 transition-colors">
                  ← Back
                </button>
                <button
                  onClick={handleComplete}
                  disabled={!intention || saving}
                  className="flex-1 bg-gradient-to-r from-saffron-500 to-saffron-600 text-white font-sans text-sm font-medium py-2.5 rounded-sm hover:from-saffron-600 hover:to-saffron-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {saving ? 'Saving...' : '🙏 Begin'}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}