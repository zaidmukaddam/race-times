import React, { useState, Fragment, useEffect } from 'react'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDown } from 'react-feather';
import Link from 'next/link';
import { useRouter } from 'next/router'

const SeasonPicker = ({ years, onChange, current }) => {
  const [selected, setSelected] = useState({ label: current, value: current})

  const changeSeason = (season) => {
    setSelected(season)
    onChange(season.label)
  }

  return (
    <div className="relative z-10 w-auto">
      <Listbox value={selected.label} onChange={changeSeason}>
        <div className="relative">
          <Listbox.Button className="w-full transition cursor-pointer hover:shadow hover:shadow-button pl-4 pr-9 text-left ">
            <strong>{selected.label}</strong>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronDown size={20}/>
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="z-20 absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white dark:bg-gray-800 p-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {years.map((item, i) => (
                <Listbox.Option
                  key={i}
                  className={({ active }) =>
                    `relative cursor-pointer rounded-md select-none py-2 px-4 ${
                      active ? 'bg-black bg-opacity-5 dark:bg-gray-700' : 'text-inherit'
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {item.label}
                      </span>
                      {selected ? (
                        <span className="text-red-500">
                          supfool
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

const Tab = ({ active, children, href }) => {
  return(
    <Link href={href}>
      <a className={`py-3 transition text-sm lg:text-base border-b-2 mr-6 ${active ? 'border-gray-900 text-gray-900 dark:text-white dark:border-white' : 'text-gray-400 border-transparent hover:text-gray-900 hover:border-gray-900 dark:text-gray-300 dark:hover:text-white dark:hover:border-white'}`}>
        {children}
      </a>
    </Link>
  )
}

const SeasonHeader = ({ selectSeason, current }) => {

  const { data, error } = useSWR('/api/seasons', fetcher)
  const navigation = [
    {
      name: 'Schedule',
      route: '/'
    }, {
      name: 'Drivers',
      route: '/drivers'
    }, {
      name: 'Teams',
      route: '/teams'
    }
  ]

  const [isVisible, setIsVisible] = useState(false);
  const [height, setHeight] = useState(0)
  
  useEffect(() => {   
    window.addEventListener("scroll", listenToScroll);
    return () => 
       window.removeEventListener("scroll", listenToScroll); 
  }, [])
  
  const listenToScroll = () => {
    let heightToHideFrom = 300;
    const winScroll = document.body.scrollTop || 
        document.documentElement.scrollTop;
    setHeight(winScroll);

    if(winScroll > (document.body.scrollHeight - 300)) {
      setIsVisible(false);
    } else if (winScroll > heightToHideFrom) {  
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const router = useRouter()

  return(
    <div className={`sticky top-12 z-20 w-full flex bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-600`}>
      <div className={`transition flex flex-col w-full mt-4 px-6 ${isVisible ? 'pt-4' : 'pt-8'} w-full max-w-screen-lg mx-auto`}>
        <div className="flex items-center">
          <h1 className={`transition font-bold text-inherit flex items-center ${isVisible ? 'text-xl' : 'text-3xl'}`}>
            <span>F1 Season</span>
            <span className="mx-2 font-light text-gray-400 text-2xl">/</span>
            {
              data && (
                <SeasonPicker onChange={selectSeason} years={data.seasons} current={current} />
              )
            }
          </h1>
        </div>
        {
          data && (
            <>
              <div className="inline-flex items-center hidden">
                <label className="text-sm inline-block mr-2 text-mono-black-60 dark:text-mono-white-60">Season:</label>
                <select className="select" onChange={selectSeason}>
                  {
                    data.seasons.map((item, i) => (
                      <option value={item.value} key={i}>{item.label}</option>
                    ))
                  }
                </select>
              </div>
            </>
          )
        }
        <div className={`transition flex w-full ${isVisible ? 'mt-4' : 'mt-8'}`}>
          {
            navigation.map((item, i) => (
              <Tab
                active={router.pathname === item.route }
                href={item.route}
                key={i}
              >
                {item.name}
              </Tab>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default SeasonHeader