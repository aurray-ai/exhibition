import { NextRequest, NextResponse } from "next/server";
import { addReflection, getReflections } from "@/lib/reflections-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const reflections = await getReflections();
  return NextResponse.json({ reflections });
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, text } = (body ?? {}) as { name?: unknown; text?: unknown };

  if (typeof text !== "string" || !text.trim()) {
    return NextResponse.json({ error: "A reflection is required." }, { status: 400 });
  }

  if (name !== undefined && typeof name !== "string") {
    return NextResponse.json({ error: "Name must be text." }, { status: 400 });
  }

  try {
    const reflection = await addReflection({ name, text });
    return NextResponse.json({ reflection }, { status: 201 });
  } catch (error) {
    console.error("Failed to store reflection:", error);
    return NextResponse.json(
      { error: "Could not save your reflection right now. Please try again shortly." },
      { status: 503 }
    );
  }
}

// No PUT, PATCH, or DELETE handlers are exported — this route only ever
// creates new reflections, so submitted entries can't be edited or removed
// through the API surface.
