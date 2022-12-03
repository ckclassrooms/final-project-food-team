import { React, useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import './component.css';
import InitialData from '../components/InitialData/initial-data.json'
import SearchBar from './SearchBar';
import { Button, Stack } from '@mui/material';
import {CheckCircle, Help } from '@mui/icons-material';

function Landing() {
  const [authorizationCode, setAuthorizationCode] = useState('');
  const [zipCode, setZipCode] = useState('');
  const initialData = InitialData.hits
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    console.log('URL:', queryParams);
    const authCode = queryParams.get('code');
    if(authCode !== null) {
      setAuthorizationCode(authCode);
    }
    console.log(authCode);
    console.log(typeof (authCode));// eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
    return (
        <>
          <p> Welcome to the recipes app. </p>
          <a className="App-link" href="https://github.com/ckclassrooms/final-project-proposal-food-team" target="_blank" rel="noopener noreferrer"> Repository </a>
          { zipCode &&
          <>
            <br/> <br/> <SearchBar authCode={authorizationCode} /> <br/> 
            <div id="loadedlist">
              <h2> Some recipes to try </h2>
                <ul>
                  <li> <Link to="/RecipeInfo" replace={true} state = {{recipe:initialData[0].recipe, auth:authorizationCode}}>Classic Taco Salad</Link> </li>
                  <li> <Link to="/RecipeInfo" replace={true} state = {{recipe:initialData[1].recipe, auth:authorizationCode}}>Vegetarian Taco Chili</Link> </li>
                  <li> <Link to="/RecipeInfo" replace={true} state = {{recipe:initialData[2].recipe, auth:authorizationCode}}>Taco Stuffed Burger</Link> </li>
                  <li> <Link to="/RecipeInfo" replace={true} state = {{recipe:initialData[3].recipe, auth:authorizationCode}}>Turkey chilli & rice tacos</Link> </li>
                  <li> <Link to="/RecipeInfo" replace={true} state = {{recipe:initialData[9].recipe, auth:authorizationCode}}>Beef Taco Roll-Ups</Link> </li>
                  <li> <Link to="/RecipeInfo" replace={true} state = {{recipe:initialData[5].recipe, auth:authorizationCode}}>Taco Chili Soup</Link> </li>
                </ul>            
            </div>
            <div>
              {!authorizationCode && <Stack direction="row" spacing={60}>
                <Button onClick={ () => /* https://starlit-twilight-fde55f.netlify.app/ http://localhost:3000/ */ window.location.href = 'https://api.kroger.com/v1/connect/oauth2/authorize?scope=cart.basic:write&response_type=code&client_id=foodappforschool-043e65debc535226ffbd8fa7ed03f8041525245609739767566&redirect_uri=https://starlit-twilight-fde55f.netlify.app/'  } variant="contained" startIcon={<Help />} color="error" >
                  If you want to add ingredients to your Kroger cart, sign in here.
                </Button>
              </Stack>}
              {authorizationCode && <Stack direction="row" spacing={60}>
                <Button onClick={ () => null  } variant="contained" startIcon={<CheckCircle />} color="success" >
                  You can now add ingredients to your Kroger cart!
                </Button>
              </Stack>}
            </div>
          </>
          }
        </>
    )
}

export default Landing