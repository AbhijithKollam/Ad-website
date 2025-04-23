import React from 'react'
import './list_style.css'
import { Link } from 'react-router-dom';

const List = () => {
    const advertisements = [
        {
            id: 123,
            title: "Luxioury couple appartment",
            price: 124,
            description: "dailas, texas 24hrs ago",
            image: "https://media.istockphoto.com/id/177427917/photo/close-up-of-red-cricket-ball-and-bat-sitting-on-grass.jpg?s=612x612&w=0&k=20&c=DcorerbBUeDNTfld3OclgHxCty4jih2yDCzipffX6zw=",
        },
        {
            id: 1234,
            title: "Beats studio wireless",
            price: 456,
            description: "dailas, texas 24hrs ago",
            image: "https://media.istockphoto.com/id/177427917/photo/close-up-of-red-cricket-ball-and-bat-sitting-on-grass.jpg?s=612x612&w=0&k=20&c=DcorerbBUeDNTfld3OclgHxCty4jih2yDCzipffX6zw=",
        }
    ];
    return (
        <div className='p-3 flex flex-col gap-3'>
            {advertisements.map((item) => (
                <div className='ads p-2 relative'>
                    <div className='flex '>
                        <div>
                            <img src={item.image} alt="" className='h-25 w-25 image' />
                        </div>
                        <div className='flex flex-col gap-1 px-2 py-1'>
                            <p className='title'>{item.title}</p>
                            <p className='description'>{item.description}</p>
                            <p className='mt-2 list-price'> ${item.price}</p>
                        </div>
                    </div>
                    <div className='flex absolute top-0 right-0 p-4 gap-4'>
                        <Link to={`/details/${item.id}`} className='view-btn px-4'>
                            View
                        </Link>
                        <button className='edit-btn px-4 py-1'>Edit Ad</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default List
