import moment from 'moment'

export default async (req,res) => {

  const {
    query: { season },
  } = req

  const response = await fetch(`https://ergast.com/api/f1/${season}.json`);
  const schedule = await response.json();
  const data = schedule.MRData.RaceTable

  const races = {
    season: data.season,
    races: [],
    completed: null
  }

  const today = new Date();

  data.Races.map(item => {
    const race = {
      name: item.raceName,
      track: item.Circuit.circuitName,
      race: item.round,
      date: item.date,
      time: `${item.date}T${item.time}`,
      country: item.Circuit.Location.country,
      city: item.Circuit.Location.locality,
      id: item.Circuit.circuitId,
      completed: moment(item.date).isBefore(today)
    }
    races.races.push(race)
  })

  const countCompleted = races.races.filter(item => {
    return item.completed
  })

  races.completed = countCompleted.length === races.races.length ? true : false

  res.status(200).json({ races });
}