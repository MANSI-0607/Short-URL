import React from 'react'
import { NavLink } from 'react-router-dom'
import './Option.css'

const Option = () => {
  return (
    <div className='option'>
      <h1>WHAT DO YOU WANT TO USE?</h1>
      <NavLink to='/short-id' className='shorturl-btn'>
        SHORT URL GENERATOR
      </NavLink>
      <NavLink to='/web-crawler' className='webcrawler-btn'>
        URL WEB CRAWLER
      </NavLink>
    </div>
  )
}

export default Option
