import React, { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import PropTypes from 'prop-types';

import {
    InstantSearch,
    Hits,
    Highlight,
    SearchBox,
    Pagination,
    Configure,
    SortBy,
    Stats,
    QueryRuleCustomData
} from 'react-instantsearch-dom';

//COMPONENTS
import CustomHits from './Hits';
import CustomFilters from './Filters';
import CustomSearchBox from './SearchBox';

const SearchResults = ({
    selectedOption,
    searchVisible,
    catSunglasses,
    catEyeGlasses
}) => {
    const searchClient = algoliasearch(window.appID, window.key);
    const [filterAnim, setFilterAnim] = useState(true);

    return (
        <div
            className={`container ${
                searchVisible || catSunglasses || catEyeGlasses
                    ? 'active'
                    : 'hidden'
            }`}
        >
            <InstantSearch
                // ...
                searchClient={searchClient}
                indexName="swarovski_customDemo_products"
            >
                <CustomSearchBox />
                <CustomHits />
                <div className="pagination">
                    <Pagination />
                </div>
            </InstantSearch>
            {/* <InstantSearch
                searchClient={searchClient}
                indexName="swarovski_customDemo_products"
            >
                <QueryRuleCustomData
                    transformItems={items => {
                        const match = items.find(data =>
                            Boolean(data.redirect)
                        );
                        if (match && match.redirect) {
                            window.location.href = match.redirect;
                        }
                        return [];
                    }}
                >
                    {() => null}
                </QueryRuleCustomData>
                <div className="search-panel">
                    <CustomSearchBox />
                    {catSunglasses ? (
                        <div className="searchPanel-results">
                            <FilterBtn
                                filterAnim={filterAnim}
                                setFilterAnim={setFilterAnim}
                            />
                            <Configure
                                userToken={selectedOption}
                                filters="categorylvl3:Sunglasses"
                                enablePersonalization={true}
                            />

                            <CustomFilters filterAnim={filterAnim} />
                            <CustomHits />
                        </div>
                    ) : (
                        <div className="searchPanel-results">
                            <Configure
                                userToken={selectedOption}
                                enablePersonalization={true}
                            />
                            <FilterBtn
                                filterAnim={filterAnim}
                                setFilterAnim={setFilterAnim}
                            />

                            <CustomFilters filterAnim={filterAnim} />
                            <CustomHits />
                        </div>
                    )}
                    {catEyeGlasses ? (
                        <div className="searchPanel-results">
                            <FilterBtn
                                filterAnim={filterAnim}
                                setFilterAnim={setFilterAnim}
                            />
                            <Configure
                                userToken={selectedOption}
                                filters="google_product_category:'Health & Beauty > Personal Care > Vision Care > Eyeglasses'"
                                enablePersonalization={true}
                            />
                            <CustomFilters filterAnim={filterAnim} />
                            <CustomHits />
                        </div>
                    ) : (
                        <div className="searchPanel-results">
                            <Configure
                                userToken={selectedOption}
                                enablePersonalization={true}
                            />
                            <FilterBtn
                                filterAnim={filterAnim}
                                setFilterAnim={setFilterAnim}
                            />
                            <CustomFilters filterAnim={filterAnim} />
                            <CustomHits />
                        </div>
                    )}

                    <div className="pagination">
                        <Pagination />
                    </div>
                </div>
            </InstantSearch> */}
        </div>
    );
};

const FilterBtn = ({ filterAnim, setFilterAnim }) => {
    return (
        <div
            className="filterBtn"
            onClick={() => {
                setFilterAnim(!filterAnim);
            }}
        >
            <p>NAVIGATION & FILTERS</p>
            {filterAnim ? <p>-</p> : <p>+</p>}
        </div>
    );
};

export default SearchResults;
