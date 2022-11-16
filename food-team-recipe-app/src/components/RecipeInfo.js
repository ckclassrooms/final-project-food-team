import React from 'react'
import { useLocation } from 'react-router-dom';

function RecipeInfo(props) {
  const { state } = useLocation();
  return (
    <div>
      Recipe Info
      {console.log(props)}
      {console.log(state)}
    </div>
  )
}

export default RecipeInfo
