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

    // Fetch account info to get PUUID
    const accountRes = await fetch(
      `https://${cluster}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}?api_key=${apiKey}`
    );

    if (!accountRes.ok) {
      console.error(`Account fetch failed: ${accountRes.status}`);
      return Response.json({ error: `Account fetch failed: ${accountRes.status}` }, { status: accountRes.status });
    }

    const accountData = await accountRes.json();
    const puuid = accountData.puuid;
    console.log("PUUID:", puuid);

    // Fetch summoner by name (v4)
    const summonerRes = await fetch(
      `https://${platform}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(gameName)}?api_key=${apiKey}`
    );

    if (!summonerRes.ok) {
      console.error(`Summoner fetch failed: ${summonerRes.status}`);
      return Response.json({ error: `Summoner fetch failed: ${summonerRes.status}` }, { status: summonerRes.status });
    }

    const summonerData = await summonerRes.json();
    console.log("Summoner response:", JSON.stringify(summonerData));
    const summonerId = summonerData.id;

    if (!summonerId) {
      console.error("No summoner ID in response");
      return Response.json({ error: "Summoner ID not found" }, { status: 400 });
    }

    // Fetch ranked stats using summoner ID
    const rankedRes = await fetch(
      `https://${platform}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${apiKey}`
    );

    if (!rankedRes.ok) {
      console.error(`Ranked fetch failed: ${rankedRes.status}`);
      return Response.json({ error: `Ranked fetch failed: ${rankedRes.status}` }, { status: rankedRes.status });
    }

    const rankedData = await rankedRes.json();
    console.log("Ranked data:", JSON.stringify(rankedData));

    const soloQueue = Array.isArray(rankedData)
      ? rankedData.find(q => q.queueType === "RANKED_SOLO_5x5")
      : null;

    console.log("Solo queue:", soloQueue);

    return Response.json({
      rank: soloQueue ? `${soloQueue.tier} ${soloQueue.rank}` : "Unranked",
      winrate: soloQueue
        ? `${((soloQueue.wins / (soloQueue.wins + soloQueue.losses)) * 100).toFixed(1)}%`
        : "N/A",
      wins: soloQueue?.wins || 0,
      losses: soloQueue?.losses || 0,
    });
  } catch (error) {
    console.error("Error fetching LoL stats:", error);
    return Response.json({ error: `Failed to fetch stats: ${error.message}` }, { status: 500 });
  }
}
