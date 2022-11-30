import { useState, useEffect, useCallback, useRef } from 'react'
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
import {IconButton, Button, Stack, Paper, Box, styled} from '@mui/material';
import {CheckCircle, ChevronLeft, Link} from '@mui/icons-material';
import $ from 'jquery'

function handlePrev() {}

// note proxy URL is probably need when working on developing
function callProductAPI (ingredient, access_token) {
  return new Promise((resolve, reject) => {
  // https://api.kroger.com/v1/products?filter.brand={{BRAND}}&filter.term={{TERM}}&filter.locationId={{LOCATION_ID}}
    const proxyurl = "https://mysterious-plains-32016.herokuapp.com/"; // a server thats lets me work in dev since cors blocks the API.
    const url = 'https://api.kroger.com/v1/products?filter.term=' + ingredient + '&filter.locationId=01400943';
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": proxyurl + url,
      "method": "GET",
      "headers": {
        "Accept": "application/json",
        "Authorization": "Bearer " + access_token
      }
    }
    $.ajax(settings).done(function (response) {
      resolve(response.data)
    });
  });
}

// function getProductDetails (PID, access_token) {
//   // This API gets product details. ID is neccesary
//   //https://api.kroger.com/v1/products/{{ID}}?filter.locationId={{LOCATION_ID}}
//   const proxyurl = "https://mysterious-plains-32016.herokuapp.com/";
//   // to do get product id's here
//   const url = 'https://api.kroger.com/v1/products/'+ PID;
//   var settings = {
//     "async": true,
//     "crossDomain": true,
//     "url": proxyurl + url,
//     "method": "GET",
//     "headers": {
//       "Accept": "application/json",
//       // to do add the auth id here
//       "Authorization": "Bearer " + access_token
//     }
//   }
  
//   $.ajax(settings).done(function (response) {
//     console.log(response);
//   });  
// }

// note proxy URL is probably need when working on developing
function getKrogerAuth () { // set API auth token. Lasts for 30 min
  return new Promise((resolve, reject) => {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.kroger.com/v1/connect/oauth2/token",
      "method": "POST",
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic Zm9vZGFwcGZvcnNjaG9vbC0wNDNlNjVkZWJjNTM1MjI2ZmZiZDhmYTdlZDAzZjgwNDE1MjUyNDU2MDk3Mzk3Njc1NjY6UXVEQ2JoMEFVSTViUy05SXJ1eWtYV01kQUN0clVZanN1TVRuRmVyLQ=="
      },
      "data": {
        "grant_type": "client_credentials",
        "scope": "product.compact"
      }
    }
    $.ajax(settings).done(function (response) {
      resolve(response)
    });
  });
}

function RecipeInfo(props) {
  const { state } = useLocation();
  const [ingredients, setIngredients] = useState([]);
  const [url, setUrl] = useState("");
  const [img, setImg] = useState(null);
  const [recipeName, setRecipeName] = useState('food');
  const [accessToken, setAccessToken] = useState('');
  let navigate = useNavigate();
  const gridRef = useRef();

  useEffect(() => {
    if(state === null || state === undefined) {  
      navigate('/'); 
    } else {
      // if(gridRef !== undefined) {
      //   gridRef.current.api.showLoadingOverlay();
      // }
      async function fnAsync() {
        let token = await getKrogerAuth();
        setAccessToken( token.access_token ); // set API auth token. Lasts for 30 min
      }
      fnAsync()
            
      const tempIngredientList = [];
      state.ingredients.forEach(elem => {
        tempIngredientList.push( <li className='ingredientList' key={elem.food}>{elem.quantity === 0 ? '1 optional' : elem.quantity} {elem.measure} {elem.food}</li> );
      })

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
      } else { // need the above checks for the prebuilt recipes imags to load cause the api calls expire.
        if (state.image !== "") {
          setImg(state.image);
        } else {
          setImg(noimg);
        }
      }
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(() => {
    if(state === null || state === undefined) {  
      navigate('/'); 
    } else {
      let tempIngredients = [];
      let tempData = [];
      let itemPrice = 0;
      async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array);
        }
      }
      const start = async () => {
        await asyncForEach(state.ingredients, async (elem) => {
          let data = await callProductAPI(elem.food, accessToken);
          itemPrice = data[0].items[0].price.regular;
          tempData.push(data);
          console.log('tempIngredients',tempIngredients);
          tempIngredients.push({ingredient : elem.food.toUpperCase(), price:itemPrice});
        });
        setIngredients(tempIngredients);
      }
      start();
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  },[accessToken])

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
  { headerName: 'Price($)', field: 'price' }
])

const onGridReady = useCallback((params) => {
  params.gridApi = params.api;
  params.gridColumnApi = params.columnApi;
  params.gridApi.sizeColumnsToFit();
}, []);

  return (
    <>
      <div>
        <>
          <h1>{recipeName}</h1>
          <IconButton size="small" onClick={event =>  window.open(url,'_blank')} color="primary" aria-label="link to website" component="label">
            <a target="_blank" rel="noreferrer" href={url}>Link to Recipe</a>
            <Link size="large" />
          </IconButton>
        </>
        <br/>
        <img src={img} width="auto" height="500" alt={recipeName} aria-label={recipeName}></img>
        <br/>
      </div>
      <br/>
      <div className='recipePrep'>
        <h2>{state.ingredients.length} ingredients: </h2>
        <Box sx={{ width: '50%' }}>
          <Stack spacing={0.5}>
            {state === null? null : state.ingredients.map(elem => {
              return <Item className='ingredientList' key={elem.food}>{elem.text.toUpperCase()}</Item>
            })}
          </Stack>
    </Box>
      </div>
      <br/>
      
      <div className="ag-theme-alpine" style={{height: '70vh', width: '90vw'}}>
        <AgGridReact
          ref={gridRef}
          style={{ width: '100%', height: '100%' }}
          rowSelection={'multiple'}
          animateRows={true}
          rowMultiSelectWithClick={true}
          rowData={ingredients}
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          overlayNoRowsTemplate={
            '<span class="ag-overlay-loading-center">Please wait while ingredients information is loading</span>'
          }
        >
        </AgGridReact>
        
        
      </div>
      <br></br>
      <div>
        <Stack direction="row" spacing={60}>
          <Button onClick={() => navigate('/')} variant="contained" startIcon={<ChevronLeft />} color="error" >
            Go Back
          </Button>
          <Button onClick={ () => navigate("/StoreLocator", {replace:true, state : {ingredients:ingredients, access_Token : accessToken} } ) } variant="contained" startIcon={<CheckCircle />} color="success" >
            Get ingredients
          </Button>
        </Stack>
      </div>
      <br></br>
    </>
  )
}

export default RecipeInfo
