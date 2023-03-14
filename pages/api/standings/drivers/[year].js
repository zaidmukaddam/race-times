export default async (req,res) => {

  const {
    query: { year },
  } = req

  const response = await fetch(`https://ergast.com/api/f1/${year}/driverStandings.json`);
  const results = await response.json();
  const data = results.MRData.StandingsTable

  const standings = {
    season: data.season,
    list: [],
  }

  data.StandingsLists[0].DriverStandings.map(item => {
    const driver = {
      position: item.position,
      points: item.points,
      wins: item.wins,
      id: item.Driver.driverId,
      code: item.Driver.code,
      firstName: item.Driver.givenName,
      lastName: item.Driver.familyName,
      dob: item.Driver.dateOfBirth,
      number: item.Driver.permanentNumber,
      country: item.Driver.nationality,
      teams: []
    }

    item.Constructors.map(team => driver.teams.push({ name: team.name, id: team.constructorId }))

    standings.list.push(driver)
  })

  res.status(200).json({ standings });
}