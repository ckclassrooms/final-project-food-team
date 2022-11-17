import {
  Routes,
  Route
} from "react-router-dom";
import Nav from './components/Navbar';
import RecipeInfo from './components/RecipeInfo';
import RecipeSearch from './components/RecipeSearch';
import Landing from './components/Landing'
import Missing from './components/Missing'
import Search_Res from "./components/Search_Res";



function App() {
  return (
    <>
      {/* <Nav /> */}
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/RecipeSearch" element={<RecipeSearch />} />
        <Route exact path="/RecipeInfo" element={<RecipeInfo  />} />
        <Route exact path="/Search_Res/:query" element={<Search_Res  />} />
        {/* <Route path="*" element={<Missing />} /> */}
      </Routes>
    </>  
  );
}

export default App;
