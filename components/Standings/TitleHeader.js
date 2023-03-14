import React from 'react'
import Title from '@components/Title'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

const TitleHeader = ({ selectSeason }) => {

  const { data, error } = useSWR('/api/seasons', fetcher)

  return(
    <Title
      label={'Formula 1 Standings'}
    >
      {
        data && (
          <div className="inline-flex items-center">
            <label className="text-sm inline-block mr-2 text-mono-black-60 dark:text-mono-white-60">Season:</label>
            <select className="select" onChange={selectSeason}>
              {
                data.seasons.map((item, i) => (
                  <option value={item.value} key={i}>{item.label}</option>
                ))
              }
            </select>
          </div>
        )
      }
    </Title>
  )
}

export default TitleHeader