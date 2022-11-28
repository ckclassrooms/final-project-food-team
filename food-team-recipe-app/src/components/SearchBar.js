import { useState } from 'react';
import {Link, Routes, Route, useNavigate} from 'react-router-dom';


function SearchBar() {

    const [input, setInput] = useState("");
    
    const navigate = useNavigate();

    const subMitHandler = event => {
        event.preventDefault();
        navigate('/SearchResult/' + input);
    }

    return (
        <form action="/" method="get" onSubmit={subMitHandler}>
            <input
                onChange={(e) => setInput(e.target.value)}
                type="text"
                id="header-search"
                placeholder="Search recipes"
                name="s" 
            />
            <button type="submit">Search</button>
        </form>
    );
}

export default SearchBar;