import React, { useState } from 'react';

//CSS / SCSS

import './SCSS/index.scss'

//COMPONENTS
import Header from './Components/Header/Header';
import SearchResults from './Components/Searchage/SearchResult'
import Homepage from './Components/Homepage/Homepage'



const App = () => {
  const [searchVisible, setSearchVisible] = useState(false)
  return (
    <div>
      <Header searchVisible={searchVisible} setSearchVisible={setSearchVisible} />
      <SearchResults searchVisible={searchVisible} />
      <Homepage searchVisible={searchVisible} />
    </div>
  );
}





export default App;
