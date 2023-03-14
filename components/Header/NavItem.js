import React from 'react'
import Link from 'next/link'
import Tag, { TagLink } from '@components/Tag'
import { useRouter } from 'next/router'

export const MobileNavItem = ({ label, route }) => {

  const router = useRouter()

  if(router.pathname === route) {
    return(
      <Link href={route}>
        <a className={'px-6 py-4 w-full bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-100'}>
          {label}
        </a>
      </Link>
    )
  } else {
    return(
      <Link href={route}>
        <a className={'px-6 py-4 w-full hover:bg-gray-0 hover:dark:bg-gray-800 transition'}>
          {label}
        </a>
      </Link>
    )
  }
}

export const NavItem = ({ label, route }) => {

  const router = useRouter()

  if(router.pathname === route) {
    return(
      <div className="inline-flex mx-1">
        <TagLink href={route}>
          {label}
        </TagLink>
      </div>
    )
  } else {
    return(
      <div className="inline-flex mx-1">
        <TagLink href={route} ghost>{label}</TagLink>
      </div>
    )
  }
}