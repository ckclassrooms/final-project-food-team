import {
  Routes,
  Route
} from "react-router-dom";
import Nav from './components/Navbar';
import RecipeInfo from './components/RecipeInfo';
import Landing from './components/Landing'
import SearchResult from "./components/SearchResult";
import StoreLocator from "./components/StoreLocator";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/StoreLocator" element={<StoreLocator />} />
        <Route exact path="/RecipeInfo" element={<RecipeInfo  />} />
        <Route exact path="/SearchResult/:query" element={<SearchResult  />} />
        <Route path="*" element={<Landing />} />
      </Routes>
    </>  
  );
}

export default App;
