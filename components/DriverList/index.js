import React, { useState, useEffect } from 'react'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Loading } from '@components/DataStates'
import Drivers from './Drivers'
import SeasonHeader from '@components/SeasonHeader'

const DriverList = () => {

  const checkSeason = () => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem("season")
    }
  }

  const d = new Date()
  const year = d.getFullYear()
  const [season, setSeason] = useState(checkSeason() === null ? year : checkSeason())

  const fetchRaces = (season) => {
    setSeason(season)
    sessionStorage.setItem("season", season);
  }

  const { data, error } = useSWR(`/api/standings/drivers/${season}`, fetcher)

  useEffect(() => {

  },[season])

  return(
    <>
      <SeasonHeader selectSeason={fetchRaces} current={season}/>
      <div className="px-4 py-12 layout">
        {
          data ? (
            <>
              <Drivers data={data.standings} />
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

export default DriverList