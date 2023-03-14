import React from 'react'
import Tag from '@components/Tag'

const Filters = ({options, active, change}) => {
  return(
    <div className="py-5">
      {
        options.map((item, i) => (
          <button className="bg-transparent p-0" key={i} onClick={() => change(item)}>
            <Tag
              type={`${active === item ? 'primary' : 'default'}`}
              ghost
              mr={`${i === options.length - 1 ? '0' : '2'}`}
            >
              {item}
            </Tag>
          </button>
        ))
      }
    </div>
  )
}

export default Filters