import React from 'react'
import { useRouter } from "next/router"
import Layout from '@components/Layout'
import RaceResults from '@components/Schedule/RaceResults'

const Page = () => {

  const router = useRouter();
  const { race, season } = router.query;

  return (
    <Layout>
      <RaceResults race={race} season={season} />
    </Layout>
  )
}

export default Page