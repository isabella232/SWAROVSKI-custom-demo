import React, { useState, Component } from 'react';

//CSS / SCSS

import './SCSS/index.scss';

//COMPONENTS
import Header from './Components/Header/Header';
import SearchResults from './Components/Searchage/SearchResult';
import Homepage from './Components/Homepage/Homepage';

const App = () => {
    const [searchVisible, setSearchVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    return (
        <div>
            <Header
                setSelectedOption={setSelectedOption}
                searchVisible={searchVisible}
                setSearchVisible={setSearchVisible}
            />
            <SearchResults
                selectedOption={selectedOption}
                searchVisible={searchVisible}
                setSearchVisible={setSearchVisible}
            />
            <Homepage searchVisible={searchVisible} />
        </div>
    );
};

export default App;
