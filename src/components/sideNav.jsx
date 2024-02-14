import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SideNav = () => {
    const navigate = useNavigate();
    const navItems = [
        {
            id: 1,
            name: "Web Users",
            path: '/',
        },
        {
            id: 2,
            name: "Mobile Users",
            path: '/mobile-users',
        },
        {
            id: 3,
            name: "Event Type",
            path: '/event-type',
        },
        {
            id: 4,
            name: "Events",
            path: '/events',
        },
        {
            id: 5,
            name: "Donation Type",
            path: '/donation-type',
        },
        {
            id: 6,
            name: "Transacions",
            path: '/transactions',
        },
    ]

const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('login');
}

    return (
        <div className='sideNav' style={{display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
            <div className='navlist'>
                {navItems.map((navItem) => (
                    <Link to={navItem.path} key={navItem.id} className='navLink'>
                        <p>{navItem.name}</p>
                    </Link>
                ))}
            </div>
            <button onClick={handleLogout} style={{height:"2.5rem", marginBottom:"3rem"}}>Logout</button>
        </div>
    )
}

export default SideNav
