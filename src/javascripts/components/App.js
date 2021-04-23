import React from 'react'
import MenuList from './MenuList'
import { BrowserRouter as Router } from 'react-router-dom'


export default function Main () {
    return (
        <Router>
            <MenuList />
        </Router>
    )
};