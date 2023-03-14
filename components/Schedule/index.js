import React, { useState, useEffect } from 'react'
import TitleHeader from '@components/Schedule/TitleHeader'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import Events from '@components/Schedule/Events'
import { Loading } from '@components/DataStates'
import SeasonHeader from '@components/SeasonHeader'

const Schedule = () => {

  const checkSeason = () => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem("season")
    }
  }

  const d = new Date()
  const year = d.getFullYear()
  const [season, setSeason] = useState(checkSeason() === null ? year : checkSeason())

  const { data, error } = useSWR(`/api/races/${season}`, fetcher)

  const fetchRaces = (season) => {
    setSeason(season)
    sessionStorage.setItem("season", season);
  }

  useEffect(() => {

  },[season])

  return(
    <>
      <SeasonHeader selectSeason={fetchRaces} current={season}/>
      <div className="px-4 py-12 layout">
        {
          data ? (
            <>
              <Events data={data.races} season={season} />
            </>
          )
          :
          (
            <Loading>
              <span className="text-sm">Loading...</span>
            </Loading>
          )
        }
      </div>
    </>
  )
}

export default Schedule