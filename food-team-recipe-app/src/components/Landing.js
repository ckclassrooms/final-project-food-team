import { React, useState, useEffect, useCallback, useRef } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import './component.css';
import InitialData from '../components/InitialData/initial-data.json'
import SearchBar from './SearchBar';
import { Button, Stack } from '@mui/material';
import {CheckCircle, Help } from '@mui/icons-material';
import $ from 'jquery'
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Geocode from "react-geocode";

function getStoreLocation (zipCode, access_token) {
  // This API gets product details. ID is neccesary
  //https://api.kroger.com/v1/locations?filter.zipCode.near={zipcode}
  return new Promise((resolve, reject) => {
    const proxyurl = 'https://corsproxy.io/?';
    const url = 'https://api.kroger.com/v1/locations?filter.zipCode.near='+ zipCode + '&filter.department=23';
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

// note proxy URL is probably need when working on developing
function getKrogerAuth () { // set API auth token. Lasts for 30 min
  return new Promise((resolve, reject) => {
    const proxyurl = 'https://corsproxy.io/?';
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": proxyurl + "https://api.kroger.com/v1/connect/oauth2/token",
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

function Landing() {
  const [productInformationToken, setProductInformationToken] = useState('');
  const [cartAuthorizationCode, setCartAuthorizationCode] = useState('');
  const [zipCode, setZipCode] = useState('');
  const initialData = InitialData.hits;
  const gridRef = useRef();
  const [showStores, setShowStores] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [locationID, setLocationID] = useState('');

  async function fnAsync() {
    let token = await getKrogerAuth();
    setProductInformationToken( token.access_token ); // set API auth token. Lasts for 30 min
    console.log('before',token.access_token);
  }

  useEffect(() => {
    fnAsync();
    const queryParams = new URLSearchParams(window.location.search);
    console.log('URL:', queryParams);
    const authCode1 = queryParams.get('code');
    const authCode2 = sessionStorage.getItem('krog_auth');
    console.log("authCode1 " + authCode1)
    console.log("authCode2 "+authCode2)
    if(authCode1 !== null) {
      setCartAuthorizationCode(authCode1);
      sessionStorage.setItem('krog_auth', authCode1);
    } else if(authCode2 !== null) {
      setCartAuthorizationCode(authCode2);
    }
    if (sessionStorage.getItem('zip_code') !== null) {
      setLocationID(sessionStorage.getItem('zip_code'));
    }

    // console.log(authCode);
    // console.log(typeof (authCode));// eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  ///////////////////// Store locator functions ////////////////////////////
  function getDep(elem) {
    return new Promise((resolve, reject) => {
      let tempDepartments = [];
      elem.departments.forEach(ele => {
        tempDepartments.push(ele.name.toUpperCase());
      })
      resolve(tempDepartments);
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    async function fnAsync() {
      let data = await getStoreLocation(zipCode, productInformationToken);
      console.log(data);
      let tempRowData = [];
      data.forEach(async elem => {
        let tempDepartments = await getDep(elem);
        let full_address = {name: elem.name, addr: elem.address.addressLine1 + ", " + elem.address.city + ", " + elem.address.state + " " + elem.address.zipCode} 
        tempRowData.push({ name:elem.name.toUpperCase() + " (" + elem.locationId + ")", address:full_address, dep:tempDepartments, id:elem.locationId });
      });
      console.log(tempRowData);
      setRowData(tempRowData);
      sessionStorage.setItem('zip_code', zipCode);
      setShowStores(true);
    }
    fnAsync();
  }

  const [columnDefs] = useState([
    {
      field: 'Select Store',
      headerCheckboxSelection: true,
      checkboxSelection: true,
      showDisabledCheckboxes: true,
      resizable: true,
      width: "150" 
    },
    { headerName: 'Store Name', field: 'name', width: "400" , resizable: true, wrapText: true, autoHeight: true },
    { headerName: 'Address', field: 'address', resizable: true, width: "350", wrapText: true, autoHeight: true,
        cellRenderer: function(params) {
          let url = "https://maps.google.com?q=" + params.value.name
          console.log(url)
          return <a href= {url} target="_blank"> {params.value.addr} </a>
        }
    },
    { headerName: 'Departments', field: 'dep', width: "350", resizable: true, autoHeight: true }
  ])

  const onGridReady = useCallback((params) => {
    params.gridApi = params.api;
    params.gridColumnApi = params.columnApi;
    params.gridApi.sizeColumnsToFit();
    gridRef.current.columnApi.autoSizeColumns()
  }, []);

  const onSelectionChanged = () => {
    const selectedData = gridRef.current.api.getSelectedRows();
    console.log('Selection Changed', selectedData, selectedData[0].id);
    if(selectedData.length > 0) {setLocationID(selectedData[0].id); setShowStores(false);}
  };
  /////////////////////////////////// end store locator functions /////////////////
  
    return (
        <>
          <div style={{textAlign: 'center', backgroundColor: 'blue', height: 'auto'}}>      
            <p> <h1 style= {{'color': '#f2db3f', 'font-family': 'futura', 'font-weight': 'bold'}}> Welcome to the Recipes App </h1></p>
            <a className="App-link" href="https://github.com/ckclassrooms/final-project-proposal-food-team" style= {{'color': 'red', 'font-weight': 'bold'}} target="_blank" rel="noopener noreferrer"> Repository</a>
          </div>    
          { productInformationToken &&
          <>
            <>
              { !locationID && !showStores &&
                <div style={{textAlign: 'center'}}>  
                  <br></br>
                  <form onSubmit={handleSubmit}>
                    <label>First, please enter your zipcode to find a kroger store:
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
                <div className="ag-theme-alpine" style={{height: '80vh', width: '98vw'}}>
                  <AgGridReact
                    ref={gridRef}
                    onSelectionChanged={onSelectionChanged}
                    style={{ width: '100%', height: '100%' }}
                    rowMultiSelectWithClick={false}
                    rowSelection={'single'}
                    rowData={!rowData?[{name: 1}, {address: 2}]: rowData}
                    columnDefs={columnDefs}
                    onGridReady={onGridReady}
                  >
                  </AgGridReact>
                </div>
              }
            </>
          </>
          }
          { locationID &&
          <>
            <div style={{textAlign: 'center', backgroundColor: 'blue', height: 'auto'}}>      
            <br/> <SearchBar authCode={cartAuthorizationCode} productAuthCode={productInformationToken} location={locationID} /> <br/> 
            </div>
            <div id="loadedlist" style={{backgroundColor: 'yellow', height: '100%'}}>
              <h2> You can now search for recipes, here are some recipes to try </h2>
                <ul>
                  <li> <Link to="/RecipeInfo" state = {{recipe:initialData[0].recipe, auth:cartAuthorizationCode, prodSearchAuth:productInformationToken,location:locationID}}>Classic Taco Salad</Link> </li>
                  <li> <Link to="/RecipeInfo" state = {{recipe:initialData[1].recipe, auth:cartAuthorizationCode, prodSearchAuth:productInformationToken,location:locationID}}>Vegetarian Taco Chili</Link> </li>
                  <li> <Link to="/RecipeInfo" state = {{recipe:initialData[2].recipe, auth:cartAuthorizationCode, prodSearchAuth:productInformationToken,location:locationID}}>Taco Stuffed Burger</Link> </li>
                  <li> <Link to="/RecipeInfo" state = {{recipe:initialData[3].recipe, auth:cartAuthorizationCode, prodSearchAuth:productInformationToken,location:locationID}}>Turkey chilli & rice tacos</Link> </li>
                  <li> <Link to="/RecipeInfo" state = {{recipe:initialData[9].recipe, auth:cartAuthorizationCode, prodSearchAuth:productInformationToken,location:locationID}}>Beef Taco Roll-Ups</Link> </li>
                  <li> <Link to="/RecipeInfo" state = {{recipe:initialData[5].recipe, auth:cartAuthorizationCode, prodSearchAuth:productInformationToken,location:locationID}}>Taco Chili Soup</Link> </li>
                </ul>            
            </div>
            <div id="loadedlist" style={{backgroundColor: 'yellow', height: '44vh'}}>
              {!cartAuthorizationCode && <Stack direction="row" spacing={60}>
                <Button onClick={ () => /* https://starlit-twilight-fde55f.netlify.app/ http://localhost:3000/ */ window.location.href = 'https://api.kroger.com/v1/connect/oauth2/authorize?scope=cart.basic:write&response_type=code&client_id=foodappforschool-043e65debc535226ffbd8fa7ed03f8041525245609739767566&redirect_uri=https://starlit-twilight-fde55f.netlify.app/'  } variant="contained" startIcon={<Help />} color="error" >
                  If you want to add ingredients to your Kroger cart, sign in here.
                </Button>
              </Stack>}
              {cartAuthorizationCode && <Stack direction="row" spacing={60}>
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