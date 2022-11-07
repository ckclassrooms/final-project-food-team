import React from 'react'
import logo from './logo.svg';
import './component.css';

function Landing() {
    return (
        <>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to the recipes app.
        </p>
        <a
          className="App-link"
          href="https://github.com/ckclassrooms/final-project-proposal-food-team"
          target="_blank"
          rel="noopener noreferrer"
        >
          Repository
        </a>
        </>
    )
}

export default Landing