import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  VIEW_COOKIE,
  VIEW_COUNTER_NAME,
  VIEW_COUNTER_NS,
  VIEW_OFFSET,
} from "@/lib/views";

type CounterPayload = {
  count?: number;
  value?: number;
  data?: { count?: number; value?: number };
};

function parseCount(data: CounterPayload): number | null {
  const raw =
    data.count ?? data.value ?? data.data?.count ?? data.data?.value ?? null;
  return typeof raw === "number" && Number.isFinite(raw) ? raw : null;
}

async function counterGet(): Promise<number> {
  const url = `https://api.counterapi.dev/v1/${VIEW_COUNTER_NS}/${VIEW_COUNTER_NAME}/`;
  const res = await fetch(url, { cache: "no-store", next: { revalidate: 0 } });
  if (!res.ok) throw new Error(`counter get ${res.status}`);
  return parseCount((await res.json()) as CounterPayload) ?? 0;
}

async function counterUp(): Promise<number> {
  const url = `https://api.counterapi.dev/v1/${VIEW_COUNTER_NS}/${VIEW_COUNTER_NAME}/up`;
  const res = await fetch(url, { cache: "no-store", next: { revalidate: 0 } });
  if (!res.ok) throw new Error(`counter up ${res.status}`);
  return parseCount((await res.json()) as CounterPayload) ?? 0;
}

export async function GET() {
  try {
    const jar = await cookies();
    const seen = jar.get(VIEW_COOKIE)?.value === "1";

    const raw = seen ? await counterGet() : await counterUp();
    const display = raw + VIEW_OFFSET;

    const response = NextResponse.json({
      count: display,
      raw,
      offset: VIEW_OFFSET,
    });

    if (!seen) {
      response.cookies.set(VIEW_COOKIE, "1", {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
    }

    return response;
  } catch {
    // Fail open with offset so the UI never looks broken.
    return NextResponse.json({
      count: VIEW_OFFSET,
      raw: 0,
      offset: VIEW_OFFSET,
    });
  }
}
