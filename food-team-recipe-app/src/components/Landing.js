import { React, useState} from 'react'
import { Link , Navigate} from "react-router-dom";
import logo from './logo.svg';
import './component.css';
import RecipeSearch from './RecipeSearch';
import SearchBar from './SearchBar';
import InitialData from './initial-data.json'
import RecipeInfo from './RecipeInfo';

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
  const [visible, setVisible] = useState(false)
  const [initialData, setInitialData] = useState(InitialData.hits)

    return (
        <>
        <img src={logo} className="App-logo" alt="logo" />
        <p> Welcome to the recipes app. </p>
        <a className="App-link" href="https://github.com/ckclassrooms/final-project-proposal-food-team" target="_blank" rel="noopener noreferrer"> Repository </a>
        {/* <br/> <br/> <SearchBar /> <br/>  */}
        <div>
          <button onClick={ () => {
            setVisible(!visible);
            // console.log(initialData);
            // for (var i = 0; i < 5; i++) {
            //   console.log(initialData[i].recipe)
            // }
            // {visible && (
            //   <Navigate to="/RecipeInfo" replace={true} state = {initialData[0].recipe} />
            // )}
            
            
          }}>
            <Link to="/RecipeInfo" replace={true} state = {initialData[0].recipe}>Classic Taco Salad</Link>
            
          </button>

          
        </div>
        
        
        </>
    )
}

export default Landing