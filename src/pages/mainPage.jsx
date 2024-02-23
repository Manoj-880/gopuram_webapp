import React, { useEffect, useState } from 'react'
import SideNav from '../components/sideNav'
import WebUsers from '../pages/webUser'
import {Routes, Route, useLocation} from 'react-router-dom'
import MobileUsers from './mobileUsers'
import EventType from './eventType'
import Events from './events'
import DonationType from './donationType'
import Transactions from './transactions'
import Gallery from './gallery'

const MainPage = () => {

    const [navActive, setNavActive] = useState(1);
    const location = useLocation();

useEffect(() => {
    signinCheck();
    switch (location.pathname) {
        case '/':
            setNavActive(1);
            break;
        case '/mobile-users':
            setNavActive(2);
            break;
        case '/event-type':
            setNavActive(3);
            break;
        case '/events':
            setNavActive(4);
            break;
        case '/donation-type':
            setNavActive(5);
            break;
        case '/transactions':
            setNavActive(6);
            break;
        case '/gallery':
            setNavActive(7);
            break;
        default:
            setNavActive(1);
            break;
        }
    }, [location.pathname]);

    const signinCheck = () => {
        if(!window.sessionStorage.getItem('userData')){ // Check sessionStorage instead of localStorage
            window.location.replace('/login');
        }
    }

    return (
        <div className='mainPage'>
            <div className='sideNavComponent'>
                <SideNav navActive={navActive} setNavActive={setNavActive}/>
            </div>
            <div className='App'>
                <Routes>
                    <Route path='/' element= {<WebUsers/>}/>
                    <Route path='/mobile-users' element= {<MobileUsers/>}/>
                    <Route path='/event-type' element= {<EventType/>}/>
                    <Route path='/events' element= {<Events/>}/>
                    <Route path='/donation-type' element= {<DonationType/>}/>
                    <Route path='/transactions' element= {<Transactions/>} />
                    <Route path='/gallery' element={<Gallery/>} />
                </Routes>
            </div>
        </div>
    )
}

export default MainPage