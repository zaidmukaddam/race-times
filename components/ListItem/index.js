import React from 'react'

const ListItem = ({border, label, children}) => {
  return(
    <div className={`flex items-center justify-between py-2 px-4 ${border && 'border-b border-gray-100 dark:border-gray-600'}`}>
      <span className="text-xs md:text-base">{label}</span>
      <div className="font-bold text-sm md:text-base">{children}</div>
    </div>
  )
}

export default ListItem