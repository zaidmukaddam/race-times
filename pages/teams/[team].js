import React from 'react'
import { useRouter } from "next/router"
import Layout from '@components/Layout'
import  { Team } from '@components/Profile'

const Page = () => {

  const router = useRouter();
  const { team } = router.query;

  return (
    <Layout>
      <Team id={team}/>
    </Layout>
  )
}

export default Page