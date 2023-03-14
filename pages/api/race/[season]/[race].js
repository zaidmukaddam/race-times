import moment from 'moment'

export default async (req,res) => {

  const {
    query: { race, season },
  } = req

  const response = await fetch(`https://ergast.com/api/f1/${season}/${race}.json`);
  const info = await response.json();
  const data = info.MRData.RaceTable

  const event = {
    season: data.season,
    round: data.round,
    active: null
  }

  const today = new Date();

  if(data.Races.length > 0) {

    const raceResponse = await fetch(`https://ergast.com/api/f1/${season}/${race}/results.json`);
    const raceInfo = await raceResponse.json();
    const raceData = raceInfo.MRData.RaceTable

    const circuit = data.Races[0]
    const races = raceData.Races

    /*
    // Add practice and qual times (conditional)
    
    practice1: {
      date:circuit.FirstPractice.date,
      time: `${circuit.FirstPractice.date}T${circuit.FirstPractice.time}`,
    },
    practice2: {
      date:circuit.SecondPractice.date,
      time: `${circuit.SecondPractice.date}T${circuit.SecondPractice.time}`,
    },
    practice3: {
      date:circuit.ThirdPractice.date,
      time: `${circuit.ThirdPractice.date}T${circuit.ThirdPractice.time}`,
    },
    qualifying: {
      date:circuit.Qualifying.date,
      time: `${circuit.Qualifying.date}T${circuit.Qualifying.time}`,
    },
    */

    const returnInfo = {
      active: true,
      name: circuit.raceName,
      track: circuit.Circuit.circuitName,
      date: circuit.date,
      time: `${circuit.date}T${circuit.time}`,
      country: circuit.Circuit.Location.country,
      city: circuit.Circuit.Location.locality,
      id: circuit.Circuit.circuitId,
      completed: moment(circuit.date).isBefore(today),
    }
    Object.assign(event, returnInfo)

    if(races.length > 0) {

      const results = {
        results: races[0].Results
      }
      Object.assign(event, results)

    }

  } else {

    const returnInfo = {
      active: false
    }
    Object.assign(event, returnInfo)
  }

  res.status(200).json({ event });
}