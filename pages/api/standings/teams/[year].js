export default async (req,res) => {

  const {
    query: { year },
  } = req

  const response = await fetch(`https://ergast.com/api/f1/${year}/constructorStandings.json`);
  const results = await response.json();
  const data = results.MRData.StandingsTable

  const standings = {
    season: data.season,
    list: [],
  }

  data.StandingsLists[0].ConstructorStandings.map(item => {
    const team = {
      position: item.position,
      points: item.points,
      wins: item.wins,
      id: item.Constructor.constructorId,
      name: item.Constructor.name,
      country: item.Constructor.nationality,
    }

    standings.list.push(team)
  })

  res.status(200).json({ standings });
}