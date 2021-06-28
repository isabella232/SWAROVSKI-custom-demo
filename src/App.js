import React, { useState, Component } from 'react';

//CSS / SCSS

import './SCSS/index.scss';

//COMPONENTS
import Header from './Components/Header/Header';
import SearchResults from './Components/Searchage/SearchResult';
import Homepage from './Components/Homepage/Homepage';

const App = () => {
    const [searchVisible, setSearchVisible] = useState(false);
    const [catSunglasses, setCatSunglasses] = useState(false);
    const [catEyeGlasses, setCatEyeGlasses] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    return (
        <div>
            <Header
                setSelectedOption={setSelectedOption}
                searchVisible={searchVisible}
                setSearchVisible={setSearchVisible}
                catSunglasses={catSunglasses}
                setCatSunglasses={setCatSunglasses}
                catEyeGlasses={catEyeGlasses}
                setCatEyeGlasses={setCatEyeGlasses}
            />
            <SearchResults
                selectedOption={selectedOption}
                searchVisible={searchVisible}
                catSunglasses={catSunglasses}
                catEyeGlasses={catEyeGlasses}
            />
            <Homepage searchVisible={searchVisible} />
        </div>
    );
};

// class SwitchExample extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { checked: false };
//         this.handleChange = this.handleChange.bind(this);
//     }

//     handleChange(checked) {
//         this.setState({ checked });
//         // this.props.onChange('checked', !checked);
//     }

//     render() {
//         const checked = this.props.checked;
//         return (
//             <label>
//                 <Switch onChange={this.handleChange} checked={checked} />
//             </label>
//         );
//     }
// }

export default App;
