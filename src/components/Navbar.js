import React from 'react'
import {Link, NavLink, withRouter} from 'react-router-dom'

const Navbar= (props)=> {
     //setTimeout(()=>{
       // props.history.push('/about')
     // }, 2000);
    return (
        <nav className =" nav-wrapper red darken-3">
            <div className="container">
                <a className= "left brand-logo">Working Days APP</a>
                <ul className="right">
                   <li>Home </li> 
                   <li> Count The Days </li> 
                   <li> Contact</li> 
                </ul>
            </div>
        </nav>
    )
}

export default Navbar