import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EVENTS, getEvent } from "@/data/events";
import EventView from "@/components/EventView";

type Params = { params: Promise<{ event: string }> };

/** Pre-renders every event page at build time. */
export function generateStaticParams() {
  return EVENTS.map((e) => ({ event: e.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { event } = await params;
  const data = getEvent(event);
  if (!data) return {};
  return { title: data.title, description: data.description };
}

export default async function Page({ params }: Params) {
  const { event } = await params;
  const data = getEvent(event);
  if (!data) notFound();

  return <EventView event={data} />;
}
