import React from 'react'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { CheckCircle, RefreshCw, Flag } from 'react-feather'

const SeasonChecker = ({ season }) => {

  const { data, error } = useSWR(`/api/races/${season}`, fetcher)

  const checkSeason = (data) => {
    const raceCount = data.races.length

    const countCompleted = data.races.filter(item => {
      return item.completed
    })

    if(raceCount === countCompleted.length) {
      return 'completed'
    } else if(countCompleted.length === 0) {
      return 'not started'
    } else {
      return 'in progress'
    }
  }

  const getIcon = type => {
    switch(type) {
      case 'completed':
        return <CheckCircle size={'16'} className="ml-1 text-success-500" />
        break;
      case 'not started':
        return <Flag size={'16'} className="ml-1 text-mono-black-60 dark:text-mono-white-60" />
        break;
      default:
        return <RefreshCw size={'16'} className="ml-1 text-mono-black-60 dark:text-mono-white-60" />
    }
  }

  return(
    <>
      {
        data && (
          <div className={`flex items-center p-4 ${checkSeason(data.races) === 'completed' ? 'bg-green-500 border-green-500' : 'bg-gray-400 border-gray-400'} rounded-lg bg-opacity-10 border border-opacity-10 mb-4`}>
            <span className={`text-sm ${checkSeason(data.races) === 'completed' ? 'text-success-500 dark:text-success-200' : 'text-mono-black-60 dark:text-mono-white-60'}`}>{season} Season {checkSeason(data.races)}</span>
            {getIcon(checkSeason(data.races))}
          </div>
        )
      }
    </>

  )
}

export default SeasonChecker