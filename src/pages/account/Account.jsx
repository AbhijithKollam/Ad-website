import React, { useEffect, useState } from 'react'
import List from '../list/List'
import "./accounts_style.css"
import authInstance from '../../apis/authinstance'
import { toast } from 'react-toastify'
import droppin from '../../assets/account/location.svg'
import email from '../../assets/account/email.svg'
import phone from '../../assets/account/phone.svg'
import { Link } from 'react-router-dom'

const Account = () => {
  const [formData, setFormData] = useState({});
  useEffect(() => {
    getUserProfile()
  }, []);

  const getUserProfile = async (e) => {
    try {
      const response = await authInstance.get('/api/profile');
      if (response.status === 200) {
        setFormData(response.data)
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  }
  return (
    <div>
      <div className='p-3 flex flex-col gap-3'>
        <div className='ads p-2 relative'>
          <div className='flex '>
            <div>
              <img src="https://media.istockphoto.com/id/177427917/photo/close-up-of-red-cricket-ball-and-bat-sitting-on-grass.jpg?s=612x612&w=0&k=20&c=DcorerbBUeDNTfld3OclgHxCty4jih2yDCzipffX6zw=" alt="" className='h-20 w-20 profile-image' />
            </div>
            <div className='flex flex-col px-2 py-1'>
              <p className='profile_name'>{formData.firstName} {formData.lastName}</p>
              <p className='profile_joined'>Member Since</p>
              <p className='profile_joined'>2025</p>
            </div>
          </div>
          <div className='mt-5 p-5 flex gap-5 border-t border-gray-200'>
            <p className='profile_joined flex gap-2'>
              <img src={droppin} alt="" />
              {formData.location}
            </p>
            <p className='profile_joined flex gap-2'>
              <img src={email} alt="" />
              {formData.email}
            </p>
            <p className='profile_joined flex gap-2'>
              <img src={phone} alt="" />
              {formData.phone}
            </p>
          </div>
          <div className='flex absolute top-0 right-0 p-4 gap-4'>
            <Link to='/profile' className='edit-profile-btn px-4 py-1'>Edit Profile</Link>
          </div>
        </div>
      </div>
      <List />
    </div>
  )
}

export default Account
