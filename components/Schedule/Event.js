import React from 'react'
import Tag from '@components/Tag'
import moment from 'moment'
import { Check, Flag, MapPin } from 'react-feather'
import 'moment-timezone'
import Link from 'next/link'

export const CalendarItem = ({day, num, month, year, completed}) => {
  return(
    <div className="relative z-10 rounded-lg text-center bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-600 overflow-hidden flex flex-col w-full">
      <div className={`text-xs font-bold py-1 ${completed ? 'bg-gray-200 dark:bg-gray-600 text-mono-black-60 dark:text-mono-white-60' : 'bg-primary-500 text-white'} uppercase tracking-widest`}>{month}</div>
      <div className="text-3xl text-black dark:text-white py-1 font-bold font-mono">{num}</div>
      <div className="text-xs pb-1 text-mono-black-60 dark:text-mono-white-60">{day}</div>
    </div>
  )
}

const Event = ({ event }) => {


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

  return (
    <Link href={`/races/${formatDate(event.date).yearString}/${event.race}`}>
      <a
        className={`py-4 pl-0 pr-0 md:px-4 mb-4 w-full md:shadow md:rounded-md border-b md:border ${event.completed ? 'opacity-60' : 'opacity-100'} border-gray-100 backdrop-blur bg-transparent md:bg-white md:bg-opacity-40 dark:md:bg-gray-900 dark:border-gray-700 dark:md:bg-opacity-40 flex items-start relative transition transform md:hover:scale-105 md:hover:shadow-lg dark:hover:border-white hover:border-gray-400 md:hover:border-gray-100 md:dark:hover:border-gray-700`}
      >
        <div className="pr-4 w-32 hidden md:block">
          <CalendarItem
            day={formatDate(event.date).dayString}
            num={formatDate(event.date).numString}
            month={formatDate(event.date).monthString}
            year={formatDate(event.date).yearString}
            completed={event.completed}
          />
        </div>
        <div className="flex flex-row md:flex-col justify-between w-full">
          <div className="w-full flex-1">
            <span className="font-bold text-sm mb-2 block md:hidden">{moment(event.date).format('dddd, MMMM D, YYYY')}</span>
            <h5 className="font-bold text-lg mb-1">{event.name}</h5>
            <span className="text-sm flex flex-col md:block mb-2 text-mono-black-60 dark:text-mono-white-60">
              <span className="inline-flex items-center"><Flag size={'12'} className="md:hidden mr-1"/>{event.track}</span>
              <span className="mx-1 hidden md:inline-block">•</span>
              <span className="inline-flex items-center"><MapPin size={'12'} className="md:hidden mr-1"/>{event.city}</span>
            </span>
          </div>
          <div>
            {
              event.completed ? (
                <Tag type={'success'}>
                  Completed
                  <Check size={'16'} className="ml-1" />
                </Tag>
              )
              :
              (
                <Tag type={'primary'} ghost>{getDateTime(event.time)}</Tag>
              )
            }
          </div>
        </div>
      </a>
    </Link>
  )
}

export default Event