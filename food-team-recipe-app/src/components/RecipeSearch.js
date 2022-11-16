import { React, useState} from 'react'
import Landing from './Landing';
function RecipeSearch() {
  const [visible, setVisible] = useState(false)
  return (
    <>
      Recipe Search.
      {/* <button onClick={ () => {
          setVisible(!visible);
        }}>
          Go Back
        </button>
        {visible && <Landing />} */}

      
    </>

    
  )
}

export default RecipeSearch;
