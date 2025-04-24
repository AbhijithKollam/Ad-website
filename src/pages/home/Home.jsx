import React, { useEffect, useState } from 'react'
import mainImage from '../../assets/home/mainImage.png';
import subImage_one from '../../assets/home/subImage_one.png';
import subImage_two from '../../assets/home/subImage_two.png';
import eye from '../../assets/home/eye.svg';
import './home_style.css'
import authInstance from '../../apis/authinstance';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [advertisements, setAdvertisements] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(advertisements.length / itemsPerPage);
    const navigate = useNavigate();

    useEffect(() => {
        getAllAdv()
    }, [])
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleAds = advertisements.slice(startIndex, endIndex);
    const getAllAdv = async () => {
        const response = await authInstance.get('/api/advertisements')
        setAdvertisements(response.data)
    }
    const getDetails = async (id) => {
        navigate(`/details/${id}`);
    }

    return (
        <div>
            <div className='flex items-center justify-center w-full mt-15'>
                <div className='w-1/2 flex items-center justify-center'>
                    <p className='main-text'>
                        Get daily thinks in same <span>platform</span>
                    </p>
                </div>
                <div class="grid grid-cols-2 gap-2 aspect-square w-1/2 max-w-md items-center justify-center">
                    <div class="h-full">
                        <img src={mainImage} class="w-full h-full object-cover rounded-md" alt='main' />
                    </div>
                    <div class="grid grid-rows-2 gap-2 h-full">
                        <img src={subImage_one} class="w-full h-full object-cover rounded-md" alt='sub' />
                        <img src={subImage_two} class="w-full h-full object-cover rounded-md" alt='sub' />
                    </div>
                </div>
            </div>
            <div>
                {visibleAds?.length && (
                    <div className='flex flex-col items-center justify-center mt-15'>
                        <p className='whats'>WHAT'S NEW</p>
                        <p className='recommend'>Fresh Recommendations</p>
                    </div>
                )}
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-40 my-10">
                        {visibleAds.map((item) => (

                            <div className="rounded-xl shadow-md p-4 flex flex-col h-full">
                                <img
                                    src={item.image}
                                    alt="item"
                                    className="w-full h-40 object-cover rounded-lg mb-4"
                                />
                                <div className="flex flex-col justify-between flex-grow">
                                    <div className="mb-4">
                                        <p className="font-semibold title text-lg">{item.title}</p>
                                        <p className="text-sm text-gray-500 desc"> {item.description}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-green-600 font-bold amount">${item.price}</p>
                                        <img src={eye} onClick={() => getDetails(item.id)} alt="view" className="w-5 h-5 eye" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center items-center gap-4 my-6">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((prev) => prev - 1)}
                            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                        >
                            Prev
                        </button>
                        <span>
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
