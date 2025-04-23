import React from 'react'
import logo from '../../assets/header/logo.svg'
import head from '../../assets/header/Contact.svg'
import './header_style.css'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    navigate('/');
  };

  return (

    <div className='relative top-0 left-0 z-50 w-full'>
      <div className='flex items-center justify-between shadow-lg'>
        <div className='p-5'>
          <Link to='/home'>
            <img src={logo} alt="" className='mx-5' />
          </Link>
        </div>
        <div className='flex items-center'>
          <div onClick={() => handleLogout()} className='flex p-3 cursor-pointer'>
            <img src={head} alt="" className='mx-2' />
            Sign In
          </div>
          <div className='p-3'>
            <Link to='/post' className='post-btn'>Post Your Ad <i class="fa-solid fa-arrow-right px-3" ></i></Link>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default Header
