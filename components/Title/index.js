import React from 'next'

const Title = ({type, label, children}) => {
  return(
    <div className={`w-full flex bg-white bg-opacity-30 dark:bg-black dark:bg-opacity-30 ${type !== 'subtitle' && 'border-b border-gray-100 dark:border-gray-600'}`}>
      <div className="flex items-center justify-between w-full mt-4 px-6 pt-8 w-full max-w-screen-xl mx-auto">
        <h1 className={`w-full flex-1 ${type === 'subtitle' ? 'text-lg font-normal text-gray-400' : 'text-3xl font-bold text-inherit'}`}>{label}</h1>
        {children}
      </div>
    </div>
  )
}

export default Title