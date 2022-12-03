import {useState, useCallback, useEffect, useRef} from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Stack } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import $ from 'jquery'
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
  // Geocode.setLanguage("en");
  // Geocode.fromAddress("Eiffel Tower").then(
  //   (response) => {
  //     const { lat, lng } = response.results[0].geometry.location;
  //     console.log(lat, lng);
  //   },
  //   (error) => {
  //     console.error(error);
  //   }
  // );
  let navigate = useNavigate();
  const gridRef = useRef();
  const { state } = useLocation();
  const [zipCode, setZipCode] = useState("");
  const [showStores, setShowStores] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if(state === null || state === undefined) {  
      navigate('/'); 
    } else {
      setAccessToken( state.access_Token ); // set API auth token. Lasts for 30 min
      setIngredients(state.ingredients);
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

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
      let data = await getStoreLocation(zipCode, accessToken);
      console.log(data);
      let tempRowData = [];
      data.forEach(async elem => {
        let tempDepartments = await getDep(elem);
        let full_address = {name: elem.name, addr: elem.address.addressLine1 + ", " + elem.address.city + ", " + elem.address.state + " " + elem.address.zipCode} 
        tempRowData.push({ name:elem.name.toUpperCase() + " (" + elem.locationId + ")", address:full_address, dep:tempDepartments });
      });
      console.log(tempRowData);
      setRowData(tempRowData);
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
    console.log('Selection Changed', selectedData);
    selectedData.length > 0 ? setIsSelected(true) : setIsSelected(false);
  };

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
      <br></br>
      <div>
        <Stack direction="row" spacing={60}>
          <Button onClick={() => navigate('/')} variant="contained" startIcon={<ChevronLeft />} color="error" >
            Go Back
          </Button>
          <Button disabled={!isSelected}
           onClick={
            () => {
              let selectedData = gridRef.current.api.getSelectedRows();
              console.log(selectedData[0]);
              alert('Redirecting to Kroger Oauth')
              // Oauth redirects to netlify with a code
              window.location.href = 'https://api.kroger.com/v1/connect/oauth2/authorize?scope=cart.basic:write&response_type=code&client_id=foodappforschool-043e65debc535226ffbd8fa7ed03f8041525245609739767566&redirect_uri=https://starlit-twilight-fde55f.netlify.app/';
            } 
          } variant="contained" startIcon={<ChevronRight />} color="success" >
            Continue
          </Button>
        </Stack>
      </div>
      <br></br>
    </>
  )
}

export default StoreLocator
