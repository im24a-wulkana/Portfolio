// Refresh hourly
export const revalidate = 3600;

const API_ROOT = "https://ws.audioscrobbler.com/2.0/";

async function lastfm(method, params) {
  const url = new URL(API_ROOT);
  url.searchParams.set("method", method);
  url.searchParams.set("api_key", process.env.LASTFM_API_KEY);
  url.searchParams.set("format", "json");
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error(`${method} failed: ${res.status}`);
  }

  const data = await res.json();
  if (data.error) {
    throw new Error(`${method} error ${data.error}: ${data.message}`);
  }
  return data;
}

// gettoptracks only returns placeholder art, so pull real album art per track.
// Returns null when Last.fm has no artwork or serves its grey placeholder.
const PLACEHOLDER = "2a96cbd8b46e442fc41c2b86b821562f";

async function getAlbumArt(artist, track) {
  try {
    const data = await lastfm("track.getInfo", { artist, track });
    const images = data.track?.album?.image ?? data.track?.image ?? [];
    for (let i = images.length - 1; i >= 0; i--) {
      const url = images[i]["#text"];
      if (url && !url.includes(PLACEHOLDER)) return url;
    }
  } catch (error) {
    console.error(`Album art lookup failed for ${artist} - ${track}:`, error.message);
  }
  return null;
}

export async function GET() {
  try {
    const user = process.env.LASTFM_USERNAME;

    if (!process.env.LASTFM_API_KEY || !user) {
      console.error("Missing Last.fm environment variables");
      return Response.json({ error: "Server configuration error" }, { status: 500 });
    }

    const [artistData, trackData] = await Promise.all([
      lastfm("user.gettopartists", { user, period: "7day", limit: 3 }),
      lastfm("user.gettoptracks", { user, period: "7day", limit: 3 }),
    ]);

    const topArtists = (artistData.topartists?.artist ?? []).map((a) => ({
      name: a.name,
      plays: Number(a.playcount),
      url: a.url,
    }));

    const topTracks = await Promise.all(
      (trackData.toptracks?.track ?? []).map(async (t) => {
        const artist = t.artist?.name ?? "";
        return {
          name: t.name,
          artist,
          plays: Number(t.playcount),
          image: await getAlbumArt(artist, t.name),
          url: t.url,
        };
      })
    );

    return Response.json({ topArtists, topTracks });
  } catch (error) {
    console.error("Error fetching music stats:", error);
    return Response.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
