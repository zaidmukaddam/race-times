export default async (req,res) => {

  const {
    query: { driver },
  } = req

  const response = await fetch(`https://ergast.com/api/f1/drivers/${driver}.json`);
  const info = await response.json();
  const data = info.MRData.DriverTable.Drivers[0]

  const d = new Date()
  const year = d.getFullYear()

  const activeResponse = await fetch(`https://ergast.com/api/f1/${year}/driverStandings.json`);
  const activeStandings = await activeResponse.json();
  const activeData = activeStandings.MRData.StandingsTable.StandingsLists[0]

  const obj = activeData.DriverStandings.find(activeData => activeData.Driver.driverId === data.driverId);

  const profile = {
    id: data.driverId,
    code: data.code,
    number: data.permanentNumber,
    firstName: data.givenName,
    lastName: data.familyName,
    dob: data.dateOfBirth,
    country: data.nationality,
    active: obj ? obj : false,
  }

  res.status(200).json({ profile });
}