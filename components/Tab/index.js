import Link from "next/link"

const Tab = ({ active, children, href }) => {
  return(
    <Link href={href}>
      <a className={`py-3 transition text-sm lg:text-base border-b-2 mr-6 ${active ? 'border-gray-900 text-gray-900 dark:text-white dark:border-white' : 'text-gray-400 border-transparent hover:text-gray-900 hover:border-gray-900 dark:text-gray-300 dark:hover:text-white dark:hover:border-white'}`}>
        {children}
      </a>
    </Link>
  )
}

export const TabButton = ({ active, children, onChange }) => {
  return(
    <button
      className={`py-3 transition text-sm lg:text-base border-b-2 mr-6 ${active ? 'border-gray-900 text-gray-900 dark:text-white dark:border-white' : 'text-gray-400 border-transparent hover:text-gray-900 hover:border-gray-900 dark:text-gray-300 dark:hover:text-white dark:hover:border-white'}`}
      onClick={() => onChange(children)}
    >
      {children}
    </button>
  )
}

export default Tab