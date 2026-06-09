export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const { name, rashi, intention } = await request.json();

    if (!name || !rashi || !intention) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
    }

    const profile = JSON.stringify({ name: name.trim(), rashi, intention });

    cookies.set('ps_profile', profile, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      httpOnly: false,
      sameSite: 'lax',
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Failed to save' }), { status: 500 });
  }
};