import React from 'react'
import Link from 'next/link'

const Tag = ({ghost, type, size, children, ml, mt, mb, mr}) => {

  const getType = color => {
    switch(color) {
      case 'primary':
        return 'bg-primary-500 text-white border-primary-600'
        break;
      case 'success':
        return 'bg-success-500 text-white border-success-600'
        break;
      case 'warning':
        return 'bg-warning-500 text-white border-warning-600'
        break;
      case 'info':
        return 'bg-info-500 text-white border-info-600'
        break;
      case 'subtle':
        return 'bg-gray-0 text-mono-black-60 border-transparent dark:text-mono-white-60 dark:bg-gray-700'
        break;
      default:
        return 'bg-gray-900 border-gray-700 text-white dark:bg-gray-0 dark:border-gray-0 dark:text-black'
    }
  }

  const getGhost = color => {
    switch(color) {
      case 'primary':
        return 'bg-primary-100 text-primary-700 border-primary-200 dark:bg-primary-800 dark:border-primary-700 dark:text-primary-0'
        break;
      case 'success':
        return 'bg-success-0 border-success-100 text-success-800 dark:bg-success-800 dark:border-success-700 dark:text-success-0'
        break;
      case 'warning':
        return 'bg-warning-0 border-warning-100 text-warning-800 dark:bg-warning-800 dark:border-warning-700 dark:text-warning-0'
        break;
      case 'info':
        return 'bg-info-0 border-info-100 text-info-800 dark:bg-info-800 dark:border-info-700 dark:text-info-0'
        break;
      case 'subtle':
        return 'bg-transparent text-mono-black-60 border-transparent dark:text-mono-white-60 dark:bg-transparnt dark:border-transparent'
        break;
      default:
        return 'text-black border-gray-200 bg-transparent dark:bg-transparent dark:text-white dark:border-gray-500'
    }
  }

  const getSize = el => {
    switch(el) {
      case 'sm':
        return 'px-2 text-xs'
        break;
      case 'lg':
        return 'px-4 text-lg'
        break;
      default:
        return 'px-3 text-sm'
    }
  }

  return(
    <span
      className={`tag mb-${mb ? mb : '0'} mt-${mt ? mt : '0'} mr-${mr ? mr : '0'} ml-${ml ? ml : '0'} ${getSize(size)} border ${ghost ? getGhost(type) : getType(type)}`}
    >
      {children}
    </span>
  )
}

export const TagLink = ({ghost, type, size, children, ml, mt, mb, mr, href}) => {

  const getType = color => {
    switch(color) {
      case 'primary':
        return 'bg-primary-500 text-white border-primary-600'
        break;
      case 'success':
        return 'bg-success-500 text-white border-success-600'
        break;
      case 'warning':
        return 'bg-warning-500 text-white border-warning-600'
        break;
      case 'info':
        return 'bg-info-500 text-white border-info-600'
        break;
      case 'subtle':
        return 'bg-gray-0 text-mono-black-60 border-transparent dark:text-mono-white-60 dark:bg-gray-700'
        break;
      default:
        return 'bg-gray-900 border-gray-700 text-white dark:bg-gray-0 dark:border-gray-0 dark:text-black'
    }
  }

  const getGhost = color => {
    switch(color) {
      case 'primary':
        return 'bg-primary-100 text-primary-700 border-primary-200 dark:bg-primary-800 dark:border-primary-700 dark:text-primary-0'
        break;
      case 'success':
        return 'bg-success-0 border-success-100 text-success-800 dark:bg-success-800 dark:border-success-700 dark:text-success-0'
        break;
      case 'warning':
        return 'bg-warning-0 border-warning-100 text-warning-800 dark:bg-warning-800 dark:border-warning-700 dark:text-warning-0'
        break;
      case 'info':
        return 'bg-info-0 border-info-100 text-info-800 dark:bg-info-800 dark:border-info-700 dark:text-info-0'
        break;
      case 'subtle':
        return 'bg-transparent text-mono-black-60 border-transparent dark:text-mono-white-60 dark:bg-transparnt dark:border-transparent'
        break;
      default:
        return 'text-black border-gray-200 bg-transparent dark:bg-transparent dark:text-white dark:border-gray-500 hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900'
    }
  }

  const getSize = el => {
    switch(el) {
      case 'sm':
        return 'px-2 text-xs'
        break;
      case 'lg':
        return 'px-4 text-lg'
        break;
      default:
        return 'px-3 text-sm'
    }
  }

  return(
    <Link href={href}>
      <a
        className={`tag mb-${mb ? mb : '0'} mt-${mt ? mt : '0'} mr-${mr ? mr : '0'} ml-${ml ? ml : '0'} ${getSize(size)} border ${ghost ? getGhost(type) : getType(type)}`}
      >
        {children}
      </a>
    </Link>
  )
}

export default Tag