import React from 'react'
import Crown from '@components/Crown'
import Flag from '@components/Flag'
import Link from 'next/link'

const PlaceCell = ({ place }) => {

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

const TableCell = ({place, children }) => {

  return(
    <td className={`p-2 border-b text-xs md:text-base border-gray-100 dark:border-gray-600 text-mono-black-60 dark:text-mono-white-60`}>
      {children}
    </td>
  )
}

const Team = ({data}) => {
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
            <Link href={`/teams/${data.id}`}>
              <a className="inline-flex items-center text-sm md:text-base font-bold text-black dark:text-white mr-1 link">
                <img
                  className="w-8 h-8 p-1 rounded-full bg-white overflow-hidden mr-2"
                  src={`/static/teams/${data.id}.png`}
                  onError={(e) => (e.currentTarget.src = '/static/teams/default.png')}
                />
                {data.name}
              </a>
            </Link>
            <div className="w-5">
              <Flag nation={data.country}/>
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell place={data.position}>{data.wins}</TableCell>
      <TableCell place={data.position}>{data.points}</TableCell>
    </>
  )
}

export default Team