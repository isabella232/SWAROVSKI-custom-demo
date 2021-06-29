import React, { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import PropTypes from 'prop-types';
import Switch from 'react-switch';

import { InstantSearch, Pagination, Configure } from 'react-instantsearch-dom';

//COMPONENTS
import CustomHits from './Hits';
import CustomHitsPrivate from './CustomHitsPrivate';
import CustomFilters from './Filters';
import CustomSearchBox from './SearchBox';

const SearchResults = ({
    selectedOption,
    searchVisible,
    catSunglasses,
    catEyeGlasses
}) => {
    const searchClient = algoliasearch(window.appID, window.key);
    // const searchClientPublic = algoliasearch(window.appID, window.keyPublic);
    const [filterAnim, setFilterAnim] = useState(true);
    const [checked, setChecked] = useState(false);

    // console.log('ID', searchClientPublic);

    return (
        <div
            className={`container ${
                searchVisible || catSunglasses || catEyeGlasses
                    ? 'active'
                    : 'hidden'
            }`}
        >
            {checked ? (
                <InstantSearch
                    // ...
                    searchClient={searchClient}
                    indexName="swarovski_customDemo_products"
                >
                    <Configure analytics={false} ruleContexts={['private']} />
                    <div className="search-switch">
                        <CustomSearchBox />
                        <div className="switch-button">
                            <h3>Access to private sale</h3>
                            <SwitchExample
                                checked={checked}
                                setChecked={setChecked}
                            />
                        </div>
                    </div>
                    <div className="display-results">
                        <CustomFilters filterAnim={filterAnim} />
                        <CustomHitsPrivate />
                    </div>
                    <div className="pagination">
                        <Pagination />
                    </div>
                </InstantSearch>
            ) : (
                <InstantSearch
                    // ...
                    searchClient={searchClient}
                    indexName="swarovski_customDemo_products"
                >
                    <Configure
                        filters="segment:'public'"
                        ruleContexts={['public']}
                    />
                    <div className="search-switch">
                        <CustomSearchBox />
                        <div className="switch-button">
                            <h3>Access to private sale</h3>
                            <SwitchExample
                                checked={checked}
                                setChecked={setChecked}
                            />
                        </div>
                    </div>
                    <div className="display-results">
                        <CustomFilters filterAnim={filterAnim} />
                        <CustomHits />
                    </div>
                    <div className="pagination">
                        <Pagination />
                    </div>
                </InstantSearch>
            )}

            {/* <InstantSearch
                searchClient={searchClient}
                indexName="swarovski_customDemo_products"
            >

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

const SwitchExample = ({ setChecked, checked }) => {
    return (
        <label>
            <Switch
                onChange={() => {
                    setChecked(!checked);
                }}
                checked={checked}
            />
        </label>
    );
};

export default SearchResults;
