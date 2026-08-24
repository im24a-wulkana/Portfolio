const RIOT_API_KEY = "RGAPI-1655e5e3-aff9-4cc6-ac00-dd6c2c9f6dc7";

export async function GET(request) {
  try {
    const gameName = "BDK ddfruit";
    const tagLine = "1312";

    // Fetch account info
    const accountRes = await fetch(
      `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}?api_key=${RIOT_API_KEY}`
    );

    if (!accountRes.ok) {
      console.error(`Account fetch failed: ${accountRes.status}`);
      return Response.json({ error: `Account fetch failed: ${accountRes.status}` }, { status: accountRes.status });
    }

    const accountData = await accountRes.json();
    console.log("Account found:", accountData.puuid);

    // Fetch summoner info
    const summonerRes = await fetch(
      `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${accountData.puuid}?api_key=${RIOT_API_KEY}`
    );

    if (!summonerRes.ok) {
      console.error(`Summoner fetch failed: ${summonerRes.status}`);
      return Response.json({ error: `Summoner fetch failed: ${summonerRes.status}` }, { status: summonerRes.status });
    }

    const summonerData = await summonerRes.json();
    console.log("Summoner found:", summonerData.id);

    // Fetch ranked stats
    const rankedRes = await fetch(
      `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerData.id}?api_key=${RIOT_API_KEY}`
    );

    const rankedData = await rankedRes.json();
    const soloQueue = Array.isArray(rankedData)
      ? rankedData.find(q => q.queueType === "RANKED_SOLO_5x5")
      : null;

    console.log("Solo queue data:", soloQueue);

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
