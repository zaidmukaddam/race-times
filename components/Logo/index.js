import React from 'react'

export const LogoIcon = ({ type }) => {
  return(
    <svg width="48" viewBox="0 0 101 27" fill="none" className={`${type === 'primary' ? 'text-primary-500' : 'text-gray-900 dark:text-white'}`} xmlns="http://www.w3.org/2000/svg">
      <path d="M84.4732 0.00317383L59.4404 26.0032H74.9877L100.021 0.00317383H84.4732Z" fill="currentColor"/>
      <path d="M0 26.0022L18.716 6.54874C20.6882 4.43907 23.0546 2.77017 25.6701 1.64443C28.2856 0.518701 31.0949 -0.0401252 33.9257 0.00224064H82.3173L72.9352 9.75403H36.3849C34.3265 9.72506 32.2839 10.132 30.3819 10.95C28.4798 11.768 26.7582 12.9799 25.322 14.5118L14.2591 26.0022H0Z" fill="currentColor"/>
      <path d="M16.7046 26.0031L27.3473 14.9492C28.4191 13.8012 29.7047 12.892 31.1259 12.277C32.5471 11.662 34.0739 11.354 35.6134 11.3718H71.3371L62.6851 20.4153H38.1828C37.2304 20.4027 36.2855 20.5916 35.4056 20.9705C34.5257 21.3493 33.7292 21.9102 33.0647 22.619L29.8064 26.0031H16.7046Z" fill="currentColor"/>
    </svg>
  )
}

const Logo = ({ type }) => {
  return(
    <div className={'inline-flex items-center'}>
      <LogoIcon type={type} />
      <span className="pl-2 text-lg font-black">Race Times</span>
    </div>
  )
}

export default Logo