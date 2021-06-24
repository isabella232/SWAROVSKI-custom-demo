import React, { useState } from 'react';

//CSS / SCSS

import './SCSS/index.scss'

//COMPONENTS
import Header from './Components/Header/Header';
import SearchResults from './Components/Searchage/SearchResult'
import Homepage from './Components/Homepage/Homepage'



const App = () => {
  const [searchVisible, setSearchVisible] = useState(false)
  const [catSunglasses, setCatSunglasses] = useState(false)
  const [catEyeGlasses, setCatEyeGlasses] = useState(false)
  return (
    <div>
      <Header searchVisible={searchVisible} setSearchVisible={setSearchVisible} catSunglasses={catSunglasses} setCatSunglasses={setCatSunglasses} catEyeGlasses={catEyeGlasses} setCatEyeGlasses={setCatEyeGlasses} />
      <SearchResults searchVisible={searchVisible} catSunglasses={catSunglasses} catEyeGlasses={catEyeGlasses} />
      <Homepage searchVisible={searchVisible} />
    </div>
  );
}





export default App;
