import {useState, useCallback, useEffect} from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Stack } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import BtnCellRenderer from "./BtnCellRenderer";
import $ from 'jquery'

function getStoreLocation (zipCode, access_token) {
  // This API gets product details. ID is neccesary
  //https://api.kroger.com/v1/locations?filter.zipCode.near={zipcode}
  const proxyurl = "https://mysterious-plains-32016.herokuapp.com/";
  // to do get product id's here
  const url = 'https://api.kroger.com/v1/locations?filter.zipCode.near='+ zipCode;
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": proxyurl + url,
    "method": "GET",
    "headers": {
      "Accept": "application/json",
      // to do add the auth id here
      "Authorization": "Bearer " + access_token
    }
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });  
}
// test
// function callProductAPI (ingredient, access_token) {
//   // https://api.kroger.com/v1/products?filter.brand={{BRAND}}&filter.term={{TERM}}&filter.locationId={{LOCATION_ID}}
//   const proxyurl = "https://mysterious-plains-32016.herokuapp.com/"; // a server thats lets me work in dev since cors blocks the API.
//   // to do change search term
//   const url = 'https://api.kroger.com/v1/products?filter.term=' + ingredient;
//   var settings = {
//     "async": true,
//     "crossDomain": true,
//     "url": proxyurl + url,
//     "method": "GET",
//     "headers": {
//       "Accept": "application/json",
//         // to do add the auth id here and add location to query
//       "Authorization": "Bearer " + access_token
//     }
//   }
  
//   $.ajax(settings).done(function (response) {
//     console.log(response);
//   });  
// }

function StoreLocator() {
  let navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);
  const [zipCode, setZipCode] = useState("");
  const [showStores, setShowStores] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    if(state === null || state === undefined) {  
      navigate('/'); 
    } else {
      setAccessToken( state.access_Token ); // set API auth token. Lasts for 30 min
      setIngredients(state.ingredients);
      //console.log(accessToken)
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`The name you entered was: ${zipCode}`);
    setShowStores(true)
  }

  const [columnDefs] = useState([
    { headerName: 'Store Name', field: 'name' },
    { field: 'address' },
    { field: 'city' },
    { field: 'state' },
    {
      field: '',
      cellRenderer: BtnCellRenderer,
      cellRendererParams: {
        clicked: function(field) {
          alert(`${field} was clicked`);
        },
      },
    }
  ])

  const onGridReady = useCallback((params) => {
    params.gridApi = params.api;
    params.gridColumnApi = params.columnApi;
    params.gridApi.sizeColumnsToFit();
  }, []);

  return (
    <>
      { !showStores &&
      <div>
        <form onSubmit={handleSubmit}>
          <label>Enter your zipcode to find a kroger store:
            <input 
              type="text" 
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </label>
          <input type="submit" />
        </form>
      </div>
      }
      {showStores &&
      <div className="ag-theme-alpine" style={{height: '78vh', width: '85vw'}}>
        <AgGridReact
          style={{ width: '100%', height: '100%' }}
          rowMultiSelectWithClick={false}
          rowData={[{name: 1}, {address: 2}]}
          columnDefs={columnDefs}
          onGridReady={onGridReady}
        >
        </AgGridReact>
      </div>
      }
      <br></br>
      <div>
        <Stack direction="row" spacing={60}>
          <Button onClick={() => navigate('/')} variant="contained" startIcon={<ChevronLeft />} color="error" >
            Go Back
          </Button>
        </Stack>
      </div>
      <br></br>
    </>
  )
}

export default StoreLocator
