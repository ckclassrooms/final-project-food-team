import {
  Routes,
  Route
} from "react-router-dom";
import Nav from './components/Navbar';
import RecipeResults from './components/RecipeResults';
import RecipeSearch from './components/RecipeSearch';
import Landing from './components/Landing'

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/RecipeSearch" element={<RecipeSearch />} />
        <Route path="/RecipeResults" element={<RecipeResults />} />
      </Routes>
    </>  
  );
}

export default App;
