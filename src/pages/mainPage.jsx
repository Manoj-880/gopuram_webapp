import React from 'react'
import SideNav from '../components/sideNav'
import WebUsers from '../pages/webUser'
import {Routes, Route} from 'react-router-dom'
import MobileUsers from './mobileUsers'
import EventType from './eventType'
import Events from './events'
import DonationType from './donationType'
import Transactions from './transactions'

const MainPage = () => {
    return (
        <div className='mainPage'>
            <div className='sideNavComponent'>
                <SideNav/>
            </div>
            <div className='App'>
                <Routes>
                    <Route path='/' element= {<WebUsers/>}/>
                    <Route path='/mobile-users' element= {<MobileUsers/>}/>
                    <Route path='/event-type' element= {<EventType/>}/>
                    <Route path='/events' element= {<Events/>}/>
                    <Route path='/donation-type' element= {<DonationType/>}/>
                    <Route path='/transactions' element= {<Transactions/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default MainPage