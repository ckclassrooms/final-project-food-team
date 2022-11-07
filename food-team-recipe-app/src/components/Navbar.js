import React from 'react'
import { NavLink } from 'react-router-dom'

function Nav() {
    return (
        <ul className="nav nav-pills navbar-expand navbar-light bg-light">
            <li className="nav-item"><NavLink className={({ isActive }) => "nav-link " + (isActive ? " active" : "")}
                to="/" end>Home</NavLink></li>
            <li className="nav-item"><NavLink className={({ isActive }) => "nav-link " + (isActive ? " active" : "")}
                to="/RecipeResults">RecipeResults</NavLink></li>
            <li className="nav-item"><NavLink className={({ isActive }) => "nav-link " + (isActive ? " active" : "")}
                to="/RecipeSearch">RecipeSearch</NavLink></li>
        </ul>
    )
}

export default Nav;