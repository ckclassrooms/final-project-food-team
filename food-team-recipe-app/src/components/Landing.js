import { React } from 'react'
import { Link } from "react-router-dom";
import logo from '../components/InitialData/logo.svg';
import './component.css';
import InitialData from '../components/InitialData/initial-data.json'

const fetchRecipe = () => {
  let finalQuery = "https://api.edamam.com/api/recipes/v2?type=public&q=Chicken%20Tinga%20Nachos%20Recipe&app_id=4d17f433&app_key=8500fd68b54d0b79b132671796c6515f&mealType=Breakfast"
    fetch(finalQuery)
      .then(response => response.json())
      .then(data => {
        console.log(data) 
        data.hits.forEach(record => {
          console.log(record);
        })
      })
}

function Landing() {
  const initialData = InitialData.hits
    return (
        <>
          <img src={logo} className="App-logo" alt="logo" />
          <p> Welcome to the recipes app. </p>
          <a className="App-link" href="https://github.com/ckclassrooms/final-project-proposal-food-team" target="_blank" rel="noopener noreferrer"> Repository </a>
          {/* <br/> <br/> <SearchBar /> <br/>  */}
          <div id="loadedlist">
            <h2> Some recipes to try </h2>
              <ul>
                <li> <Link to="/RecipeInfo" replace={true} state = {initialData[0].recipe}>Classic Taco Salad</Link> </li>
                <li> <Link to="/RecipeInfo" replace={true} state = {initialData[1].recipe}>Vegetarian Taco Chili</Link> </li>
                <li> <Link to="/RecipeInfo" replace={true} state = {initialData[2].recipe}>Taco Stuffed Burger</Link> </li>
                <li> <Link to="/RecipeInfo" replace={true} state = {initialData[3].recipe}>Turkey chilli & rice tacos</Link> </li>
                <li> <Link to="/RecipeInfo" replace={true} state = {initialData[9].recipe}>Beef Taco Roll-Ups</Link> </li>
                <li> <Link to="/RecipeInfo" replace={true} state = {initialData[5].recipe}>Taco Chili Soup</Link> </li>
              </ul>            
          </div>
        </>
    )
}

export default Landing