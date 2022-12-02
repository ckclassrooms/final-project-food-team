import { useState } from 'react';
import {useNavigate} from 'react-router-dom';


function SearchBar({ authCode }) {
    console.log('authCode:', authCode);
    const [input, setInput] = useState("");
    
    const navigate = useNavigate();

    const submitHandler = event => {
        event.preventDefault();
        navigate('/SearchResult/' + input, {state : {auth:authCode}});
    }

    return (
        <form action="/" method="get" onSubmit={submitHandler}>
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