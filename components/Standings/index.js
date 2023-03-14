import React, { useState, useEffect } from 'react'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Loading } from '@components/DataStates'
import TitleHeader from '@components/Standings/TitleHeader'
import Drivers from '@components/Standings/Drivers'
import Teams from '@components/Standings/Teams'
import Filters from '@components/Filters'
import SeasonHeader from '@components/SeasonHeader'

const Standings = () => {

  const d = new Date()
  const year = d.getFullYear()
  const [season, setSeason] = useState(year)

  const filters = ['Drivers', 'Teams']
  const [active, setActive] = useState(filters[0])

  const fetchRaces = (season) => {
    setSeason(season)
  }

  const { data, error } = useSWR(`/api/standings/${active.toLowerCase()}/${season}`, fetcher)

  useEffect(() => {

  },[season])

  return(
    <>
      <SeasonHeader selectSeason={fetchRaces}/>
      <div className="px-4 py-12 w-full md:w-3/4 lg:w-1/2">
        {
          data ? (
            <>
              <Filters options={filters} active={active} change={setActive}/>
              {
                active === 'Drivers' ? (
                  <Drivers data={data.standings} />
                )
                :
                (
                  <Teams data={data.standings} />
                )
              }
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

export default Standings