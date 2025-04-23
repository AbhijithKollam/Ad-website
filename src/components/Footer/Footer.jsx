import React from 'react'
import logo from '../../assets/footer/logo.png'
import facebook from '../../assets/footer/Text.svg'
import twitter from '../../assets/footer/Component 25.svg'
import be from '../../assets/footer/Component 25 (1).svg'
import youtube from '../../assets/footer/Youtube.svg'
import './footer_style.css'

const Footer = () => {
  return (
    <div>
      <div className='footer sticky bottom-0 left-0 z-50 w-full flex items-center justify-between p-10'>
        <div className='flex items-center gap-10'>
          <img src={logo} alt="" />
          Copyright 2024
        </div>
        <div className='flex gap-10'>
          <img src={facebook} alt="" />
          <img src={twitter} alt="" />
          <img src={be} alt="" />
          <img src={youtube} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Footer
