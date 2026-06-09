import { kv } from '@vercel/kv';

export interface UserProfile {
  name: string;
  rashi: string;
  intention: string;
  createdAt: string;
}

const TTL = 60 * 60 * 24 * 365; // 1 year in seconds

export async function getProfile(userId: string): Promise<UserProfile | null> {
  try {
    const profile = await kv.get<UserProfile>(`profile:${userId}`);
    return profile ?? null;
  } catch {
    return null;
  }
}

export async function saveProfile(userId: string, profile: UserProfile): Promise<void> {
  await kv.set(`profile:${userId}`, profile, { ex: TTL });
}