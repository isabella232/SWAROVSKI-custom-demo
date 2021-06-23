import React from 'react'

import {
    connectSearchBox
} from 'react-instantsearch-dom'

const SearchBox = ({ currentRefinement, refine }) => {
    return (
        <div className="searchBox-wrapper">
            <input
                type="search"
                value={currentRefinement}
                onChange={event => refine(event.currentTarget.value)}
                placeholder="Search..."
            />
        </div>
    );
}

const CustomSearchBox = connectSearchBox(SearchBox);

export default CustomSearchBox;