import { React, useState } from 'react'
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect } from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

function SearchResult() {
    const { state } = useLocation();
    const authCode = state.auth;
    console.log('authCode:', authCode);
    let navigate = useNavigate();
    const [results, setResults] = useState([]);
    let query = useParams();


    useEffect(() => {
        getRecipes(query.query)// eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    async function getRecipes(query) {
        const proxyurl = 'https://corsproxy.io/?';
        let url = proxyurl + "https://api.edamam.com/api/recipes/v2?q="+ query + "&app_key=8500fd68b54d0b79b132671796c6515f&_cont=CHcVQBtNNQphDmgVQntAEX4Bakt7BQUERmNAC2QUYFV6AQQVX3cRBWcSMFZzAlUGRjFFAzZBMAElAgAAQmxJBGJCZFQgVRFqX3cWQT1OcV9xBB8VADQWVhFCPwoxXVZEITQeVDcBaR4-SQ%3D%3D&type=public&app_id=4d17f433";
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
                        return <div className="result" key={recipe.label}> <li className='recipeList' key={recipe.label + index}> <img src={recipe.image} width="200" height="100" alt={recipe}></img> <Link to="/RecipeInfo" state = {{recipe:recipe, auth:authCode}}>{recipe.label}</Link> Source: {recipe.source}</li> <br></br> </div>
                    })
                }
              </ul>            
          </div>
          <Stack direction="row" spacing={60}>
            <Button onClick={() => navigate('/')} variant="contained" startIcon={<ChevronLeftIcon />} color="error" >
            Go Back
            </Button>
          </Stack>
          <br></br>
        </>
    )
}

export default SearchResult