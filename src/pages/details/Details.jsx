import React, { useEffect, useState } from 'react'
import authInstance from '../../apis/authinstance';
import { useParams } from 'react-router-dom';
import tag from '../../assets/details/tag.svg'
import './details_style.css'
import { toast } from 'react-toastify';

const Details = () => {
  const { id } = useParams();
  const [adv, setAdv] = useState({})

  useEffect(() => {
    getDetails();
  }, [id])

  const getDetails = async () => {
    try {
      const response = await authInstance.get(`/api/advertisements/${id}`)
      if (response.status === 200) {
        setAdv(response.data);
      } else {
        toast.error(response.data.error.message)
      }
    } catch (err) {
      console.log(err)
    }
  }
  
  return (
    <div className="w-full px-40 py-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="lg:w-3/4 w-full borderd rounded-xl p-6 space-y-4">
          <div>
            <p className="text-xl font-semibold">{adv?.title}</p>
          </div>
          <div>
            <img
              className="w-full h-80 object-cover rounded-lg"
              src={adv?.image}
              alt="Adv"
            />
          </div>
          <div>
            <p className="overview">Overview</p>
            <p className="overview-text pt-2">{adv?.description}</p>
          </div>
        </div>

        <div className="lg:w-1/4 w-full flex flex-col gap-4">
          <div className="borderd rounded-xl p-4">
            <div className='relative'>
              <p className="price-text">Price</p>
              <p className="price">${adv?.price}</p>
              <img src={tag} alt="" className='absolute top-0 right-0' />
            </div>
          </div>

          <div className="borderd rounded-xl p-4 flex-1">
            <p className="text-center font-medium">Profile</p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Details
