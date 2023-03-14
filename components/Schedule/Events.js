import React, { useState, useEffect } from 'react'
import { Empty } from '@components/DataStates'
import Event from '@components/Schedule/Event'
import { motion } from 'framer-motion'
import Filters from '@components/Filters'
import SeasonChecker from '@components/SeasonChecker'

const Events = ({ data, season }) => {

  const upcoming = data.races.filter((item) => !item.completed)
  const past = data.races.filter((item) => item.completed).reverse()

  const upcomingFilters = ['Upcoming', 'Completed', 'All']

  const [active, setActive] = useState(data.completed ? 'Completed' : 'Upcoming')
  const [completed, setCompleted] = useState(data.completed)

  const filterData = () => {
    if(active === 'Upcoming') {
      return upcoming
    } else if(active === 'Completed') {
      return past
    } else {
      return data.races
    }
  }

  useEffect(() => {
    setCompleted(data.completed)
    setActive(data.completed ? 'Completed' : 'Upcoming')
  },[season])

  const filtered = filterData()

  return(
    <>
      {
        completed ? (
          <SeasonChecker season={season} />
        )
        :
        (
          <Filters options={upcomingFilters} active={active} change={setActive}/>
        )
      }
      {
        filtered.length > 0 ? (
          filtered.map((item,i ) => (
            <motion.div
              className="opacity-0 top-4 relative"
              animate={{ opacity: 1, top: 0 }}
              transition={{ duration: 0.3, delay: 0.1*i }}
              key={i}
            >
              <Event key={item.race} event={item}/>
            </motion.div>
          ))
        )
        :
        (
          <Empty>
            <span className="text-sm">There are no {active.toLowerCase()} events for the {season} season</span>
          </Empty>
        )
      }
    </>
  )
}

export default Events