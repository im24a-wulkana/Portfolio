// Refresh hourly
export const revalidate = 3600;

// Resolve champion IDs -> names via Data Dragon (public, no API key needed)
async function getChampionNames() {
  try {
    const versionsRes = await fetch("https://ddragon.leagueoflegends.com/api/versions.json", {
      next: { revalidate: 3600 },
    });
    const [version] = await versionsRes.json();

    const champRes = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`,
      { next: { revalidate: 3600 } }
    );
    const { data } = await champRes.json();

    const byId = {};
    for (const champ of Object.values(data)) {
      byId[Number(champ.key)] = { name: champ.name, image: champ.id, version };
    }
    return byId;
  } catch (error) {
    console.error("Data Dragon lookup failed:", error);
    return {};
  }
}

export async function GET() {
  try {
    const apiKey = process.env.RIOT_API_KEY;
    const gameName = process.env.RIOT_GAME_NAME;
    const tagLine = process.env.RIOT_TAG_LINE;
    const platform = process.env.RIOT_PLATFORM;
    const cluster = process.env.RIOT_CLUSTER;

    if (!apiKey || !gameName || !tagLine || !platform || !cluster) {
      console.error("Missing Riot API environment variables");
      return Response.json({ error: "Server configuration error" }, { status: 500 });
    }

    // Riot ID -> PUUID
    const accountRes = await fetch(
      `https://${cluster}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}?api_key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );

    if (!accountRes.ok) {
      console.error(`Account fetch failed: ${accountRes.status}`);
      return Response.json({ error: "Account not found" }, { status: accountRes.status });
    }

    const { puuid } = await accountRes.json();

    // Ranked entries by PUUID
    const leagueRes = await fetch(
      `https://${platform}.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}?api_key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );

    if (!leagueRes.ok) {
      console.error(`League fetch failed: ${leagueRes.status}`);
      return Response.json({ error: "Ranked data unavailable" }, { status: leagueRes.status });
    }

    const leagueData = await leagueRes.json();
    const solo = leagueData.find((q) => q.queueType === "RANKED_SOLO_5x5");

    // Top champions by mastery
    const masteryRes = await fetch(
      `https://${platform}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?count=3&api_key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );

    let topChampions = [];
    if (masteryRes.ok) {
      const masteries = await masteryRes.json();
      const championNames = await getChampionNames();
      topChampions = masteries.map((m) => {
        const champ = championNames[m.championId];
        return {
          id: m.championId,
          name: champ?.name || `Champion ${m.championId}`,
          iconUrl: champ
            ? `https://ddragon.leagueoflegends.com/cdn/${champ.version}/img/champion/${champ.image}.png`
            : null,
          points: m.championPoints,
        };
      });
    }

    const games = solo ? solo.wins + solo.losses : 0;

    return Response.json({
      rank: solo ? `${titleCase(solo.tier)} ${solo.rank}` : "Unranked",
      lp: solo ? solo.leaguePoints : null,
      winrate: games > 0 ? `${((solo.wins / games) * 100).toFixed(1)}%` : "N/A",
      wins: solo?.wins ?? 0,
      losses: solo?.losses ?? 0,
      topChampions,
    });
  } catch (error) {
    console.error("Error fetching LoL stats:", error);
    return Response.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}

function titleCase(str) {
  return str.charAt(0) + str.slice(1).toLowerCase();
}
