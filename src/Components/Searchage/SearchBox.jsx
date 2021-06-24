import React from 'react';

import { connectSearchBox, VoiceSearch } from 'react-instantsearch-dom';

const SearchBox = ({ currentRefinement, refine }) => {
    return (
        <div className="searchBox-wrapper">
            <input
                type="search"
                value={currentRefinement}
                onChange={event => refine(event.currentTarget.value)}
                placeholder="Search..."
            />
            <VoiceSearch searchAsYouSpeak={false} />
        </div>
    );
};

const CustomSearchBox = connectSearchBox(SearchBox);

export default CustomSearchBox;
