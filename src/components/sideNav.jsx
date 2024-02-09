import React from 'react'
import { Link } from 'react-router-dom'

const SideNav = () => {
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
            name: "Transactions",
            path: '/transactions',
        },
    ]
    return (
        <div className='sideNav' >
            <div className='navlist'>
                {navItems.map((navItem) => (
                    <Link to={navItem.path} key={navItem.id} className='navLink'>
                        <p>{navItem.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SideNav
