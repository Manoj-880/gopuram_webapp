import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ComputerIcon from '@mui/icons-material/Computer';
import StayPrimaryPortraitIcon from '@mui/icons-material/StayPrimaryPortrait';
import EventNoteIcon from '@mui/icons-material/EventNote';
import EventIcon from '@mui/icons-material/Event';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import CollectionsIcon from '@mui/icons-material/Collections';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const SideNav = ({navActive, setNavActive}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const navItems = [
        {
            id: 1,
            name: "Web Users",
            path: '/',
            icon: <ComputerIcon/>,
        },
        {
            id: 2,
            name: "Mobile Users",
            path: '/mobile-users',
            icon: <StayPrimaryPortraitIcon/>,
        },
        {
            id: 3,
            name: "Event Type",
            path: '/event-type',
            icon: <EventNoteIcon/>,
        },
        {
            id: 4,
            name: "Events",
            path: '/events',
            icon: <EventIcon/>,
        },
        {
            id: 5,
            name: "Donation Type",
            path: '/donation-type',
            icon: <VolunteerActivismIcon/>,
        },
        {
            id: 6,
            name: "Transacions",
            path: '/transactions',
            icon: <SyncAltIcon/>,
        },
        {
            id: 7,
            name: "Gallery",
            path: '/gallery',
            icon: <CollectionsIcon/>,
        },
    ]

    useEffect(() => {
        const userDetailsString = sessionStorage.getItem('userData');
        if (userDetailsString) {
            const userDetails = JSON.parse(userDetailsString);
            setUser(userDetails);
        }
    }, [])

    const navStyle = {
        active: "navLink active",
        inActive: "navLink inactive"
    }

    const handleLogout = () => {
        sessionStorage.removeItem('userData');
        navigate('login');
    }

    const handleOnClickLink = (id) => {
        setNavActive(id);
    }

    return (
        <div className='sideNav' style={{display:"flex", flexDirection:"column"}}>
            <div className="userDetails">
                <div className="userIcon">
                    <AccountBoxIcon style={{fontSize: "84"}}/>
                </div>
                <div className="userData">
                    <p className="userName">{user.userName}</p>
                    <p className="userNumber">{user.mobileNumber}</p>
                </div>
            </div>
            <hr />
            <div className='navlist'>
                {navItems.map((navItem) => (
                    <Link to={navItem.path} key={navItem.id} className={navItem.id === navActive ? navStyle.active : navStyle.inActive} onClick={() => handleOnClickLink(navItem.id)}>
                        <p >
                            {navItem.icon}
                            {navItem.name}
                        </p>
                    </Link>
                ))}
            </div>
            <button className='logout' onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default SideNav
