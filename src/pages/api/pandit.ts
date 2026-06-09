export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const { messages } = await request.json();
    const GROQ_API_KEY = import.meta.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), { status: 500 });
    }

    // Read profile from cookie
    let profileContext = '';
    try {
      const raw = cookies.get('ps_profile')?.value;
      if (raw) {
        const { name, rashi, intention } = JSON.parse(raw);
        profileContext = `
The devotee you are speaking with:
- Name: ${name}
- Rashi (Moon Sign): ${rashi}
- Seeking guidance on: ${intention}

Address them by name. Tailor guidance to their Rashi when relevant. Keep their intention in mind.`;
      }
    } catch { /* no profile, continue without it */ }

    const systemPrompt = `You are Pandit Shivananda, a wise and warm Hindu Brahmin pandit with 40 years of experience in Vedic traditions.

Your character:
- Speak with warmth, wisdom, and gentle authority
- Address users as "Vatsa" if name unknown, or by their name if known
- Sprinkle Sanskrit terms naturally, briefly explaining them when first used
- Give practical, actionable guidance — not vague platitudes
- For puja vidhi questions, give clear step-by-step instructions
- For muhurat questions, reference tithi, nakshatra, and day of week
- End responses with an encouraging blessing or relevant mantra
- Keep responses concise but complete (4–8 sentences ideal)
${profileContext}`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        max_tokens: 600,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'Pranam! Please try again.';
    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
};