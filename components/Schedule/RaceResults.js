import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import fetcher from '@utils/fetcher'
import { Loading, Empty } from '@components/DataStates'
import Filters from '@components/Filters'
import Tag from '@components/Tag'
import moment from 'moment'
import 'moment-timezone'
import { Check, ArrowLeft, ChevronDown } from 'react-feather'
import { CalendarItem } from '@components/Schedule/Event'
import ListItem from '@components/ListItem'
import { PlaceCell, TableCell } from '@components/DriverList/Driver'
import { TableHeader } from '@components/DriverList/Drivers'
import Crown from '@components/Crown'
import { motion } from 'framer-motion'
import Flag from '@components/Flag'
import { TabButton } from '@components/Tab'

const Driver = ({driver}) => {

  const [open,setOpen] = useState(false)

  return(
    <>
      <motion.tr
        className="opacity-0"
        animate={{ opacity: 1 }}
        transition={{ duration: 0.12, delay: 0.05*driver.position }}
        key={driver.position}
      >
        <PlaceCell place={driver.position}/>
        <TableCell place={driver.position}>
          {
            driver.position === '1' || driver.position === '2' || driver.position === '3' ? (
              <Crown place={driver.position}/>
            )
            :
            (
              <div className="h-6 w-6 inline-flex items-center justify-center text-xs font-bold">{driver.position}</div>
            )
          }
        </TableCell>
        <TableCell place={driver.position}>
          <div className="flex flex-col">
            <div className="flex items-center">
              <Link href={`/drivers/${driver.Driver.driverId}`}>
                <a className="text-sm md:text-base font-bold text-black dark:text-white mr-1 link">{driver.Driver.code}</a>
              </Link>
              <div className="w-5">
                <Flag nation={driver.Driver.nationality}/>
              </div>
            </div>
            <div className="flex items-center">
              <Link href={`/teams/${driver.Constructor.constructorId}`}>
                <a className="text-xs mr-1 link">{driver.Constructor.name}</a>
              </Link>
              <span className="text-xs mr-1">•</span>
              <span className="text-xs">#{driver.Driver.permanentNumber}</span>
            </div>
          </div>
        </TableCell>
        <TableCell place={driver.position}>{driver.points}</TableCell>
        <TableCell place={driver.position}>{driver.Time ? driver.Time.time : '-'}</TableCell>
        <TableCell place={driver.position}>
          <button className="p-1 rounded-md" onClick={() => setOpen(!open)}>
            <ChevronDown size="20" className={`transform transition ${open ? 'rotate-180' : 'rotate-0'}`} />
          </button>
        </TableCell>
      </motion.tr>
      {
        open && (
          <tr>
          <td colSpan="100%">
            <div className="p-2 pl-24 md:pl-32 text-xs md:text-sm bg-gray-50 dark:bg-gray-800 text-mono-black-60 dark:text-mono-white-60">
              Driver:&nbsp;
              <Link href={`/drivers/${driver.Driver.driverId}`}>
                <a className="font-bold text-black dark:text-white link">
                  {driver.Driver.givenName} {driver.Driver.familyName}
                </a>
              </Link>
            </div>
            <div className="p-2 pl-24 md:pl-32 text-xs md:text-sm bg-gray-50 dark:bg-gray-800 text-mono-black-60 dark:text-mono-white-60">
              Laps: {driver.laps ? driver.laps : '-'} ({driver.status})
            </div>
            {
              driver.FastestLap && (
                <div className="p-2 pl-24 md:pl-32 border-b text-xs md:text-sm bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-600 text-mono-black-60 dark:text-mono-white-60">
                  Fastest Lap: {driver.FastestLap.Time.time} • Avg {driver.FastestLap.AverageSpeed.speed} {driver.FastestLap.AverageSpeed.units}
                </div>
              )
            }
          </td>
        </tr>
        )
      }
    </>
  )
}

// {driver.laps ? driver.laps `(${driver.status})` : '-'}
// {driver.Time.time ? driver.Time.time : '-'}

const ScheduleItem = ({label, data}) => {

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ]

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const formatDate = date => {
    let d = new Date(date)
    let year = d.getFullYear()
    const dateObj = {
      dayString: dayNames[moment(date).day()],
      numString: moment(date).date(),
      monthString: monthNames[moment(date).month()],
      yearString: year
    }
    return dateObj
  }

  const getDateTime = (time) => {
    const date = new Date(time)
    const formatted = date.getTime()
    const zone = moment.tz(moment.tz.guess()).zoneName()
    const joined = `${moment(formatted).format('h:mm A')} ${zone}`
    return joined
  }

  return(
    <div
      className={`py-4 pl-0 pr-0 md:px-4 mb-4 w-full md:shadow md:rounded-md border-b md:border border-gray-100 backdrop-blur bg-transparent md:bg-white md:bg-opacity-40 dark:md:bg-gray-900 dark:border-gray-700 dark:md:bg-opacity-40 flex items-start relative transition transform`}
    >
      <div className="pr-4 w-32 hidden md:block">
        <CalendarItem
          day={formatDate(data.date).dayString}
          num={formatDate(data.date).numString}
          month={formatDate(data.date).monthString}
          year={formatDate(data.date).yearString}
          completed={false}
        />
      </div>
      <div className="flex flex-row md:flex-col justify-between w-full">
        <div className="w-full flex-1">
          <span className="font-bold text-sm mb-2 block md:hidden">{moment(data.date).format('dddd, MMMM D, YYYY')}</span>
          <h5 className="font-bold text-lg mb-1">{label}</h5>
        </div>
        <div>
        {
          data.completed ? (
            <Tag type={'success'}>
              Completed
              <Check size={'16'} className="ml-1" />
            </Tag>
          )
          :
          (
            <Tag type={'primary'} ghost>{getDateTime(data.time)}</Tag>
          )
        }
        </div>
      </div>
    </div>
  )
}

const Schedule = ({race}) => {
  return(
    <ScheduleItem label={'Race Session'} data={race}/>
  )
}

const Results = ({race}) => {
  return(
    <table className="w-full rounded-md overflow-hidden table-auto">
      <thead>
        <tr>
          <TableHeader/>
          <TableHeader>Place</TableHeader>
          <TableHeader>Driver</TableHeader>
          <TableHeader>Points</TableHeader>
          <TableHeader>Time</TableHeader>
          <TableHeader/>
        </tr>
      </thead>
      <tbody>
        {
          race.results.map((item, i) => (
            <Driver driver={item} key={i} />
          ))
        }
      </tbody>
    </table>
  )
}

const Race = ({race}) => {

  const [isVisible, setIsVisible] = useState(false);
  const [height, setHeight] = useState(0)
  
  useEffect(() => {   
    window.addEventListener("scroll", listenToScroll);
    return () => 
       window.removeEventListener("scroll", listenToScroll); 
  }, [])
  
  const listenToScroll = () => {
    let heightToHideFrom = 300;
    const winScroll = document.body.scrollTop || 
        document.documentElement.scrollTop;
    setHeight(winScroll);

    if(winScroll > (document.body.scrollHeight - 300)) {
      setIsVisible(false);
    } else if (winScroll > heightToHideFrom) {  
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const filters = null

  if(race.completed) {
    filters = ['Results', 'Info']
  } else {
    filters = ['Info']
  }

  const [active, setActive] = useState(filters[0])

  const getTab = active => {
    switch(active) {
      case 'Results':
        return <Results race={race}/>
        break;
      case 'Info':
        return (
          <div>
            <Schedule race={race}/>
            <div className="rounded-md border border-gray-100 dark:border-gray-600">
              <ListItem label="Circuit" border>
                {race.track}
              </ListItem>
              <ListItem label="Location" border>
                {race.city}, {race.country}
              </ListItem>
              <ListItem label="Round" border>
                Round {race.round} in {race.season} season
              </ListItem>
            </div>
          </div>
        )
        break;
      default:
        return <Results race={race}/>
    }
  }

  return(
    <>
    <div className="w-full sticky top-12 z-20 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-600">
      <div className={`transition flex flex-col w-full px-6 ${isVisible ? 'pt-8 pb-4' : 'pt-8 pb-8'} w-full max-w-screen-lg mx-auto`}>
        <div className={`text-sm text-mono-black-60 dark:text-mono-white-60 mb-4 ${isVisible ? 'hidden': 'block'}`}>
          <Link href={'/schedule'}>
            <a className="hover:underline">Schedule</a>
          </Link>
          <span className="mx-1">/</span>
          <span className="font-bold text-black dark:text-white">{race.name}</span>
        </div>
        <div className="flex flex-col md:flex-row items-start justify-between">
          <div>
            <div className="flex items-center">
              {
                isVisible && (
                  <Link href={'/schedule'}>
                    <a className="mr-2">
                      <ArrowLeft size={24}/>
                    </a>
                  </Link>
                )
              }
              <h1 className={`transition ${isVisible ? 'text-xl md:text-2xl' : 'text-3xl md:text-5xl'} font-black`}>{race.name}</h1>
            </div>
            {
              !isVisible && (
                <span className="text-sm text-mono-black-60 dark:text-mono-white-60">{race.track} • {race.city}</span>
              )
            }
          </div>
        </div>
      </div>
      {
        race.completed && (
          <div className="flex layout px-6">
            {
              filters.map((item, i) => (
                <TabButton
                  key={i}
                  onChange={setActive}
                  active={active === item}
                >
                  {item}
                </TabButton>
              ))
            }
          </div>
        )
      }
    </div>
      <div className="px-4 py-12 layout">
        {getTab(active)}
      </div>
    </>
  )
}

const RaceResults = ({race, season}) => {

  const { data, error } = useSWR(`/api/race/${season}/${race}`, fetcher)

  return(
    <>
      {
        data ? (
          <>
            {
              data.event.active ? (
                <Race race={data.event}/>
              )
              :
              (
                <Empty>
                  <h4 className="font-bold text-2xl">Race Not Schedule</h4>
                  <Link href="/schedule">
                    <a className="link">Back to Schedule</a>
                  </Link>
                </Empty>
              )
            }
          </>
        )
        :
        (
          <Loading>
            Loading...
          </Loading>
        )
      }
    </>
  )
}

export default RaceResults