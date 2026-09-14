import { Redis } from "@upstash/redis";
import { randomUUID } from "crypto";
import { Reflection, seedReflections } from "@/data/reflections";

const REFLECTIONS_KEY = "reflections";

const NAME_MAX_LENGTH = 80;
const TEXT_MAX_LENGTH = 1000;

let redis: Redis | null = null;
let redisInitAttempted = false;

function getRedis(): Redis | null {
  if (!redisInitAttempted) {
    redisInitAttempted = true;
    const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
    if (url && token) {
      redis = new Redis({ url, token });
    }
  }
  return redis;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

async function ensureSeeded(client: Redis): Promise<void> {
  const length = await client.llen(REFLECTIONS_KEY);
  if (length > 0) return;

  const seeded: Reflection[] = seedReflections.map((entry, i) => ({
    ...entry,
    id: `seed-${i}`,
    createdAt: new Date(0).toISOString(),
  }));

  // rpush appends only — safe even if another request seeds concurrently,
  // since duplicate seed entries are harmless and never overwrite real submissions.
  if (seeded.length > 0) {
    await client.rpush(REFLECTIONS_KEY, ...seeded);
  }
}

export async function getReflections(): Promise<Reflection[]> {
  const client = getRedis();
  if (!client) {
    return seedReflections.map((entry, i) => ({
      ...entry,
      id: `seed-${i}`,
      createdAt: new Date(0).toISOString(),
    }));
  }

  await ensureSeeded(client);
  const entries = await client.lrange<Reflection>(REFLECTIONS_KEY, 0, -1);
  return entries.reverse();
}

export async function addReflection(input: {
  name?: string;
  text: string;
}): Promise<Reflection> {
  const text = input.text.trim().slice(0, TEXT_MAX_LENGTH);
  if (!text) {
    throw new Error("Reflection text is required.");
  }

  const name = (input.name ?? "").trim().slice(0, NAME_MAX_LENGTH) || "Anonymous";

  const reflection: Reflection = {
    id: randomUUID(),
    name,
    text,
    date: formatDate(new Date()),
    createdAt: new Date().toISOString(),
  };

  const client = getRedis();
  if (!client) {
    throw new Error(
      "Reflections storage is not configured. Add the Redis/KV integration in the Vercel dashboard."
    );
  }

  // rpush only ever appends this entry — there is no code path here that
  // updates or removes an existing list member, so prior reflections are
  // never overwritten or deleted by this API.
  await client.rpush(REFLECTIONS_KEY, reflection);

  return reflection;
}
