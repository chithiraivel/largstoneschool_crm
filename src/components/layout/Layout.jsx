import React, {useEffect} from 'react'

import './layout.css'

import Sidebar from '../sidebar/Sidebar'
import TopNav from '../topnav/TopNav'
import Routes from '../Routes'

import { BrowserRouter, Route, useLocation } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import ThemeAction from '../../redux/actions/ThemeAction'
import { useState } from 'react'
import LoginPage from '../../pages/LoginPage'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'

const Layout = () => {
    

    const themeReducer = useSelector(state => state.ThemeReducer)

    const dispatch = useDispatch()
    const [login,setLogin]=useState(localStorage.getItem('isLogin'))
let a;
    useEffect(() => {
        a =localStorage.getItem('isLogin')
        const themeClass = localStorage.getItem('themeMode', 'theme-mode-light')

        const colorClass = localStorage.getItem('colorMode', 'theme-mode-light')

        dispatch(ThemeAction.setMode(themeClass))

        dispatch(ThemeAction.setColor(colorClass))
    }, [dispatch])
console.log(login);
    return (
        <BrowserRouter>
        { a? (
        <>
        <Redirect to='/login' ></Redirect>
        <Route to='/login' component={LoginPage}></Route>
        </>
        ) : (
            <Route render={(props) => (
                
                <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
                    <Sidebar {...props}/>
                    <div className="layout__content">
                        <TopNav/>
                        <div className="layout__content-main">
                            <Routes/>
                        </div>
                    </div>
                </div>
            )}/>
            )}
        </BrowserRouter>
    )
}

export default Layout
