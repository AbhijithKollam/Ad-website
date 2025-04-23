import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './side_style.css';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const menu = [
        {
            name: 'My Account',
            url: '/account',
        },
        {
            name: 'Profile',
            url: '/profile',
        },
        {
            name: 'Ads',
            url: '/list',
        },
        {
            name: 'Post',
            url: '/post',
        },
        {
            name: 'Logout',
            url: '/logout',
        },
    ];

    const handleLogout = () => {
        sessionStorage.removeItem('token'); 
        sessionStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div className="h-screen bg-white sidebar mx-9 mt-3 text-black p-6" style={{ width: '300px' }}>
            <ul className="space-y-4">
                {menu.map((item, index) => {
                    const isActive = location.pathname === item.url;
                    return (
                        <li key={index}>
                            {item.name === 'Logout' ? (
                                <button
                                    onClick={handleLogout}
                                    className={`block ${isActive ? 'items' : ''} py-2 px-4 rounded cursor-pointer`}
                                >
                                    {item.name}
                                </button>
                            ) : (
                                <Link
                                    to={item.url}
                                    className={`block ${isActive ? 'items' : ''} py-2 px-4 rounded cursor-pointer`}
                                >
                                    {item.name}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Sidebar;
