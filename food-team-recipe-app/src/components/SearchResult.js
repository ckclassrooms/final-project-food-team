import { React, useState } from 'react'
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect } from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {IconButton, Paper, Box, styled} from '@mui/material';
import {CheckCircle, ChevronLeft, AddShoppingCart} from '@mui/icons-material';

function SearchResult() {
    const { state } = useLocation();
    const authCode = state.auth;
    const productAuthCode= state.productAuthCode;
    const location=state.location;
    let navigate = useNavigate();
    const [results, setResults] = useState([]);
    let query = useParams();


    useEffect(() => {
        getRecipes(query.query)// eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

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
                        
                        return <div className="result" key={recipe.label}> 
                        <Box sx={{ width: '60%' }}>
                         <Item className='recipeList'  key={recipe.label + index} onClick={() => navigate("/RecipeInfo", {state: {recipe:recipe, auth:authCode, prodSearchAuth:productAuthCode, location:location}})}> 
                            <Stack spacing={10} direction="row">
                                <img src={recipe.image} width="300" height="200" alt={recipe}></img> 
                                <Stack spacing={0.5} style ={{display: 'flex', alignItems: "center", justifyContent: "center"}}>
                                    <h1>{recipe.label}</h1> 
                                    <h6 > Source: {recipe.source}</h6>
                                </Stack>
                            </Stack>
                          
                        </Item>
                        </Box>
                        </div>
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