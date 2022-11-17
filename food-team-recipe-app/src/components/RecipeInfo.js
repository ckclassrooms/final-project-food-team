import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import beeftaco from '../components/InitialData/beeftaco.jpeg'
import tacoburger from '../components/InitialData/tacoburg.png'
import tacosalad from '../components/InitialData/tacosalad.jpeg'
import turk from '../components/InitialData/turk.webp'
import vegtacochili from '../components/InitialData/vegtacochili.webp'
import noimg from '../components/InitialData/noimg.gif'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';


function handlePrev() {}

function RecipeInfo(props) {
  const { state } = useLocation();
  const [ingredients, setIngredients] = useState([]);
  const [ingredientList, setIngredientList] = useState([]);
  const [url, setUrl] = useState("");
  const [img, setImg] = useState(null);
  const [recipeName, setRecipeName] = useState('food');
  let navigate = useNavigate();

  useEffect(() => {
    if(state === null || state === undefined) {  
      navigate('/'); 
    } else {
      // console.log(state)
      const tempIngredients = [];
      const tempIngredientList = [];
      state.ingredients.forEach(elem => {
        tempIngredientList.push( <li className='ingredientList' key={elem.food}>{elem.quantity === 0 ? '1 optional' : elem.quantity} {elem.measure} {elem.food}</li> );
        tempIngredients.push({ingredient : elem.food, price:'N/A'});
      })
      setIngredients(tempIngredients);
      setIngredientList(tempIngredientList);
      setUrl(state.url);
      setRecipeName(state.label);
      if(state.label === 'Taco Chili Soup') {
        setImg(noimg)
      } else if(state.label === 'Vegetarian Taco Chili') {
        setImg(vegtacochili)
      } else if(state.label === 'Classic Taco Salad') {
        setImg(tacosalad)
      } else if(state.label === 'Taco Stuffed Burger') {
        setImg(tacoburger)
      } else if(state.label === 'Turkey chilli & rice tacos') {
        setImg(turk)
      } else if(state.label === 'Beef Taco Roll-Ups') {
        setImg(beeftaco)
      } else {}
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const [columnDefs] = useState([
  {
    field: 'Add to order',
    headerCheckboxSelection: true,
    checkboxSelection: true,
    showDisabledCheckboxes: true,
  },
  { field: 'ingredient' },
  { field: 'price' }
])

  return (
    <>
      <div>
        <h1><a target="_blank" href={url}>{recipeName}</a></h1>
        <br/>
        <img src={img} width="auto" height="500" alt={recipeName}></img>
        <br/>
      </div>
      <br/>
      <div className='recipePrep'>
        <h2>{ingredients.length} ingredients: </h2>
        <Box sx={{ width: '50%' }}>
          <Stack spacing={0.5}>
            {state.ingredients.map(elem => {
              return <Item className='ingredientList' key={elem.food}>{elem.quantity === 0 ? '1 optional' : elem.quantity} {elem.measure} {elem.food}</Item>
            })}
          </Stack>
    </Box>
      </div>
      <br/>
      
      <div className="ag-theme-alpine" style={{height: 500, width: 800}}>
        <AgGridReact
          rowData={ingredients}
          columnDefs={columnDefs}>
        </AgGridReact>
      </div>
      <div className="next_prev">
        <ul>
        <button type="submit" onClick={() => navigate('/')}>Previous</button>
        <button type="submit">Next</button>
        </ul>
      </div>
    </>
  )
}

export default RecipeInfo
