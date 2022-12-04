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
import {CheckCircle, ChevronLeft, Link, AddShoppingCart} from '@mui/icons-material';
import $ from 'jquery'

function handlePrev() {}
/*
{
  "items": [
     {
       "upc": "0001200016268",
       "quantity": 3 
      }
    ]
 }: 
*/

function callAddToCartAPI (code, upcCode, quantity) {
  return new Promise((resolve, reject) => {
    //const proxyurl = "https://mysterious-plains-32016.herokuapp.com/"; // a server thats lets me work in dev since cors blocks the API.
    const proxyurl = 'https://corsproxy.io/?';
    var settings = {
      "async": true,
      "crossDomain": true,
      "url":  "https://api.kroger.com/v1/cart/add",
      "method": "PUT",
      "headers": {
        "Accept": "application/json",
        "Authorization": "Bearer " + code,
      },
      "processData": false,
      "data": "{\n  \"items\": [\n     {\n       \"upc\": \"" + upcCode + "\",\n       \"quantity\": " + quantity + " \n      }\n    ]\n }"
}
    $.ajax(settings).done(function (response) {
      resolve(response)
    });
  });
}

function callGetAddToCartToken (code) {
  return new Promise((resolve, reject) => {
    //const proxyurl = "https://mysterious-plains-32016.herokuapp.com/"; // a server thats lets me work in dev since cors blocks the API.
    const proxyurl = 'https://corsproxy.io/?';
    var settings = {
      "async": true,
      "crossDomain": true,
      "url":proxyurl + "https://api.kroger.com/v1/connect/oauth2/token",
      "method": "POST",
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic Zm9vZGFwcGZvcnNjaG9vbC0wNDNlNjVkZWJjNTM1MjI2ZmZiZDhmYTdlZDAzZjgwNDE1MjUyNDU2MDk3Mzk3Njc1NjY6UXVEQ2JoMEFVSTViUy05SXJ1eWtYV01kQUN0clVZanN1TVRuRmVyLQ=="
      },
      "data": {
        "grant_type": "authorization_code",
        "scope": "cart.basic:write",
        'code': code,
        'redirect_uri':'https://starlit-twilight-fde55f.netlify.app/'
      }
    }
    $.ajax(settings).done(function (response) {
      // /* https://starlit-twilight-fde55f.netlify.app/ */ http://localhost:3000/
      resolve(response)
    });
  });
}

// note proxy URL is probably need when working on developing
function callProductAPI (ingredient, access_token, location) {
  return new Promise((resolve, reject) => {
  // https://api.kroger.com/v1/products?filter.brand={{BRAND}}&filter.term={{TERM}}&filter.locationId={{LOCATION_ID}}
    //const proxyurl = "https://mysterious-plains-32016.herokuapp.com/"; // a server thats lets me work in dev since cors blocks the API.
    const proxyurl = 'https://corsproxy.io/?';
    const url = 'https://api.kroger.com/v1/products?filter.term=' + ingredient + '&filter.locationId=' + location;
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

function RecipeInfo(props) {
  const data  = useLocation();
  const state = data.state.recipe;
  const auth_Code = data.state.auth;
  const productSearchToken =  data.state.prodSearchAuth;
  const location =  data.state.location;
  const [ingredients, setIngredients] = useState([]);
  const [url, setUrl] = useState("");
  const [img, setImg] = useState(null);
  const [recipeName, setRecipeName] = useState('food');
  const [accessToken, setAccessToken] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [hasAuthCode, setHasAuthCode] = useState(false);
  const [productUPCCodes, setProductUPCCodes] = useState([]);
  let navigate = useNavigate();
  const gridRef = useRef();

  useEffect(() => {
    if(state === null || state === undefined) {  
      navigate('/'); 
    } else {
      setAccessToken(productSearchToken);
            
      const tempIngredientList = [];
      state.ingredients.forEach(elem => {
        tempIngredientList.push( <li className='ingredientList' key={elem.food}>{elem.quantity === 0 ? '1 optional' : elem.quantity} {elem.measure} {elem.food}</li> );
      })

      setUrl(state.url);
      setRecipeName(state.label);
      if(auth_Code !== undefined || auth_Code !== null) {
        if(auth_Code.length !== 0) {
          setAuthCode(auth_Code);
          setHasAuthCode(true);
        }
      }
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

  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  useEffect(() => {
    if(state === null || state === undefined) {  
      navigate('/'); 
    } else {
      let tempIngredients = [];
      let tempUPCs = [];
      let itemPrice = 'Out of Stock';
      let itemImage = noimg;
      const start = async () => {
        await asyncForEach(state.ingredients, async (elem) => {
          let data = await callProductAPI(elem.food, accessToken, location);

          if(data[0].items[0].hasOwnProperty('price')){
            itemPrice = data[0].items[0].price.regular;
            if(itemImage = data[0].images[0].sizes.length <= 4) {itemImage = data[0].images[0].sizes[0].url;}
            else{itemImage = data[0].images[0].sizes[4].url;}
          }
          
          let itemQuantity=1;
          if(elem.quantity < 1){itemQuantity=1;}
          if(elem.quantity > 5){itemQuantity=5;}
          tempUPCs.push({'upc': data[0].upc, 'quantity' : itemQuantity });
          tempIngredients.push({img: itemImage, ingredient : elem.food.toUpperCase(), desc: data[0].description, price:"$" + itemPrice
          , quant: data[0].items[0].size});
        });
        setIngredients(tempIngredients);
        setProductUPCCodes(tempUPCs);
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
  // {
  //   field: '',
  //   // headerCheckboxSelection: true,
  //   // checkboxSelection: true,
  //   showDisabledCheckboxes: true,
  //   width: 50
  // },
  {
    headerName: "Image",
    field: 'img',
    autoHeight: true,
    cellRenderer: function(params) {
      return <img src={params.value} width="auto" height="100"></img>;
    }
  },
  { field: 'ingredient', width: 200 },
  {
    headerName: 'Description',
    field: 'desc',
    wrapText: true,
    width: 500
  },
  { headerName: 'Price($) at your location', field: 'price', width: 250},
  { headerName: 'Quantity', field: 'quant', width: 200}
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
          <IconButton size="small" color="primary" aria-label="link to website" component="label">
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
          // defaultColDef={{
          //   cellStyle: () => ({
          //     display: "flex",
          //     alignItems: "center",
          //     justifyContent: "center"
          //   })
          // }}
          ref={gridRef}
          style={{ width: '100%', height: '100%' }}
          //rowSelection={'multiple'}
          animateRows={true}
          //rowMultiSelectWithClick={true}
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
          <Button onClick={() => navigate(-1)} variant="contained" startIcon={<ChevronLeft />} color="error" >
            Go Back
          </Button>
          <Stack direction="column" spacing={2}>
          {hasAuthCode && <Button onClick={
             () => {
                const addToCart = async () => {
                let data = await callGetAddToCartToken(authCode);
                await asyncForEach(productUPCCodes, async (elem) => {
                  let upcCode = elem.upc;
                  let quantity = elem.quantity;
                  let data2 = await callAddToCartAPI(data.access_token, upcCode, quantity);
                });
                alert("Items added to https://www.kroger.com/cart cart");
              }
              addToCart();
             }
            } variant="contained" startIcon={<AddShoppingCart />} color="success" >
            Add all ingredients to Kroger cart
          </Button>}
          <Button onClick={ () =>  window.location.href = 'https://api.kroger.com/v1/connect/oauth2/authorize?scope=cart.basic:write&response_type=code&client_id=foodappforschool-043e65debc535226ffbd8fa7ed03f8041525245609739767566&redirect_uri=https://starlit-twilight-fde55f.netlify.app/' } variant="contained" startIcon={<CheckCircle />} color="success" >
            Click here to login to add to your cart.
          </Button>
          </Stack>
        </Stack>
      </div>
      <br></br>
    </>
  )
}

export default RecipeInfo
