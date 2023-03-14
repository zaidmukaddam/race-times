import React, { useEffect } from 'react'
import Layout from '@components/Layout'
import { useRouter } from 'next/router'

const Page = () => {

  const router = useRouter()

  useEffect(() => {
    router.push('/', undefined, { shallow: true })
  },[])

  return (
    <Layout>
      
    </Layout>
  )
}

export default Page
