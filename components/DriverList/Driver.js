import React from 'react'
import Crown from '@components/Crown'
import Flag from '@components/Flag'
import Link from 'next/link'

export const PlaceCell = ({ place }) => {

  const getPlace = place => {
    switch(place) {
      case '1':
        return '#FFC800'
        break;
      case '2':
        return '#B3BAC3'
        break;
      case '3':
        return '#F3A965'
        break;
      default:
        return 'transparent'
    }
  }

  return(
    <td className={`p-0 border-b text-xs md:text-base border-gray-100 dark:border-gray-600 text-mono-black-60 dark:text-mono-white-60`}>
      <div className="h-12 w-1 rounded-tr-sm rounded-br-sm" style={{ background: getPlace(place) }}/>
    </td>
  )
}

export const TableCell = ({place, children }) => {

  return(
    <td className={`p-2 border-b text-xs md:text-base border-gray-100 dark:border-gray-600 text-mono-black-60 dark:text-mono-white-60`}>
      {children}
    </td>
  )
}

const Driver = ({data}) => {
  return(
    <>
      <PlaceCell place={data.position}/>
      <TableCell place={data.position}>
        {
          data.position === '1' || data.position === '2' || data.position === '3' ? (
            <Crown place={data.position}/>
          )
          :
          (
            <div className="h-6 w-6 inline-flex items-center justify-center text-xs font-bold">{data.position}</div>
          )
        }
      </TableCell>
      <TableCell place={data.position}>
        <div className="flex flex-col">
          <div className="flex items-center">
            <Link href={`/drivers/${data.id}`}>
              <a className="text-sm md:text-base font-bold text-black dark:text-white mr-1 link">{data.firstName} {data.lastName}</a>
            </Link>
            <div className="w-5">
              <Flag nation={data.country}/>
            </div>
          </div>
          {
            data.teams.length > 0 && (
              <div className="flex items-center">
                {
                  data.teams.map((team, i) => (
                    <Link href={`/teams/${team.id}`} key={i}>
                      <a className="text-xs mr-1 link">{team.name}</a>
                    </Link>
                  ))
                }
                <span className="text-xs mr-1">•</span>
                <span className="text-xs">#{data.number}</span>
              </div>
            )
          }
        </div>
      </TableCell>
      <TableCell place={data.position}>{data.wins}</TableCell>
      <TableCell place={data.position}>{data.points}</TableCell>
    </>
  )
}

export default Driver