import type { VercelRequest, VercelResponse } from "@vercel/node";

type YoutubeVideosResponse = {
  items?: Array<{
    statistics?: {
      viewCount?: string;
    };
  }>;
};

/** Vues YouTube (API Data v3) — clé `YOUTUBE_API_KEY` dans les variables Vercel. */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const rawId = req.query.id;
  const id = typeof rawId === "string" ? rawId.trim() : "";
  if (!id || !/^[\w-]{11}$/.test(id)) {
    return res.status(400).json({ error: "Invalid YouTube video id" });
  }

  const apiKey = process.env.YOUTUBE_API_KEY?.trim();
  if (!apiKey) {
    return res.status(503).json({ error: "YouTube API not configured" });
  }

  const params = new URLSearchParams({
    part: "statistics",
    id,
    key: apiKey,
  });

  try {
    const upstream = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?${params.toString()}`,
    );
    if (!upstream.ok) {
      return res.status(502).json({ error: "YouTube API error" });
    }

    const data = (await upstream.json()) as YoutubeVideosResponse;
    const viewCountRaw = data.items?.[0]?.statistics?.viewCount;
    const viewCount = viewCountRaw ? Number.parseInt(viewCountRaw, 10) : NaN;

    if (!Number.isFinite(viewCount) || viewCount < 0) {
      return res.status(404).json({ error: "View count unavailable" });
    }

    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    return res.status(200).json({ viewCount });
  } catch {
    return res.status(502).json({ error: "Failed to fetch view count" });
  }
}
