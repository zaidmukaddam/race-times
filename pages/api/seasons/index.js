export default async (req,res) => {

  const response = await fetch(`https://ergast.com/api/f1/seasons.json?limit=100`);
  const results = await response.json();
  const data = results.MRData.SeasonTable

  const seasonData = []

  data.Seasons.map(item => {

    const year = {
      label: item.season,
      value: item.season
    }

    seasonData.push(year)
  })

  const seasons = seasonData.reverse()

  res.status(200).json({ seasons });
}