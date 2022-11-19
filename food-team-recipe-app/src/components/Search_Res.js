import { React, useState } from 'react'
import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect } from 'react'
import SearchBar from './SearchBar';



function Search_Res() {
    const [results, setResults] = useState([]);
    let query = useParams();


    useEffect(() => {
        getRecipes(query.query)
    },[])


    async function getRecipes(query) {
        let url = "https://api.edamam.com/api/recipes/v2?q="+ query + "&app_key=8500fd68b54d0b79b132671796c6515f&_cont=CHcVQBtNNQphDmgVQntAEX4Bakt7BQUERmNAC2QUYFV6AQQVX3cRBWcSMFZzAlUGRjFFAzZBMAElAgAAQmxJBGJCZFQgVRFqX3cWQT1OcV9xBB8VADQWVhFCPwoxXVZEITQeVDcBaR4-SQ%3D%3D&type=public&app_id=4d17f433";
        let results_list = []
        const response = await fetch(url);
        await response.json().then(data_elem => {
            data_elem.hits.forEach(element => {
                results_list.push(element.recipe)
            });
        });
        setResults(results_list);
    }
   
    return (
        <>
          <div id="results">
          {/* <br/> <br/> <SearchBar /> <br/>  */}
            <h2> Search Results for query: {query.query} </h2>
              <ul>
                {
                    results.map((recipe, index) => {
                        return <li className='recipeList' key={recipe.label + index}> <img src={recipe.image} width="200" height="100" alt={recipe}></img> <Link to="/RecipeInfo" state = {recipe}>{recipe.label}</Link> Source: {recipe.source}</li>
                    })
                }
              </ul>            
          </div>
        </>
    )
}

export default Search_Res