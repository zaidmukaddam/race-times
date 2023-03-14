import React from 'react'
import Driver from './Driver'
import { motion } from 'framer-motion'
import SeasonChecker from '@components/SeasonChecker'

export const TableHeader = ({children}) => {
  return(
    <th className="text-xs py-1 px-2 text-left font-normal uppercase text-mono-black-60 dark:text-mono-white-60">
      {children}
    </th>
  )
}

const Drivers = ({ data }) => {
  return(
    <>
      <SeasonChecker season={data.season} />
      <table className="w-full rounded-md overflow-hidden">
        <thead>
          <tr>
            <TableHeader/>
            <TableHeader>Rank</TableHeader>
            <TableHeader>Driver</TableHeader>
            <TableHeader>Wins</TableHeader>
            <TableHeader>Pts</TableHeader>
          </tr>
        </thead>
        <tbody>
          {
            data.list.map((item, i) => (
              <motion.tr
                className="opacity-0"
                animate={{ opacity: 1 }}
                transition={{ duration: 0.12, delay: 0.05*i }}
                key={item.position}
              >
                <Driver data={item} key={i} />
              </motion.tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}

export default Drivers