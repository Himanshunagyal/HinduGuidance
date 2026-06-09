export const prerender = false;

import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ cookies }) => {
  try {
    const raw = cookies.get('ps_profile')?.value;
    const profile = raw ? JSON.parse(raw) : null;
    return new Response(JSON.stringify({ profile }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ profile: null }), { status: 200 });
  }
};