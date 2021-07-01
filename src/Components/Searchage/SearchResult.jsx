import React, { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import PropTypes from 'prop-types';
import Switch from 'react-switch';

import {
    InstantSearch,
    Pagination,
    Configure,
    QueryRuleContext
} from 'react-instantsearch-dom';

//COMPONENTS
import CustomHits from './Hits';
import CustomHitsPrivate from './CustomHitsPrivate';
import CustomFilters from './Filters';
import CustomSearchBar from './SearchBox';

const SearchResults = ({ searchVisible, setSearchVisible }) => {
    const searchClient = algoliasearch(window.appID, window.key);
    // const searchClientPublic = algoliasearch(window.appID, window.keyPublic);
    const [filterAnim, setFilterAnim] = useState(true);
    const [checked, setChecked] = useState(false);
    const [isGlobal, setIsGlobal] = useState(false);
    const [isPublic, setIsPublic] = useState(false);
    const [isPrivate, setIsPrivate] = useState(false);
    const [toggleIsShow, setToggleIsShow] = useState(true);
    const [noParams, setNoParams] = useState(true);
    const [params, setParams] = useState('');

    if (window.location.search) {
        const params = new URLSearchParams(window.location.search).get(
            'newsletter'
        );
        if (
            new URLSearchParams(window.location.search)
                .get('newsletter')
                .includes('global') &&
            !isGlobal
        ) {
            setIsGlobal(true);
            setSearchVisible(true);
            setChecked(false);
            setToggleIsShow(true);
            setNoParams(false);
            setParams(params);
        }
        if (
            new URLSearchParams(window.location.search)
                .get('newsletter')
                .includes('public') &&
            !isPublic
        ) {
            setIsPublic(true);
            setSearchVisible(true);
            setToggleIsShow(false);
            setNoParams(false);
            setParams(params);
        }
        if (
            new URLSearchParams(window.location.search)
                .get('newsletter')
                .includes('private') &&
            !isPrivate
        ) {
            setIsPrivate(true);
            setSearchVisible(true);
            setToggleIsShow(false);
            setChecked(true);
            setNoParams(false);
            setParams(params);
        }
    }

    return (
        <div className={`container ${searchVisible ? 'active' : 'hidden'}`}>
            {checked ? (
                <InstantSearch
                    // ...
                    searchClient={searchClient}
                    indexName="swarovski_customDemo_products"
                >
                    <QueryRuleContext
                        trackedFilters={{
                            segment: () => ['public'] // this tracks two static genre values,
                        }}
                    />
                    <Configure
                        analytics={false}
                        ruleContexts={isPrivate ? [params] : ['private']}
                    />
                    <div className="search-switch">
                        {noParams ? (
                            <div>
                                <CustomSearchBar />
                            </div>
                        ) : (
                            ''
                        )}
                        {toggleIsShow ? (
                            <div className="switch-button">
                                <h3>Access to private sale</h3>
                                <SwitchExample
                                    checked={checked}
                                    setChecked={setChecked}
                                />
                            </div>
                        ) : (
                            ''
                        )}
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
                    <QueryRuleContext />
                    <Configure
                        filters="segment:'public'"
                        ruleContexts={isPublic ? [params] : ['public']}
                    />
                    <div className="search-switch">
                        {noParams ? (
                            <div>
                                <CustomSearchBar />
                            </div>
                        ) : (
                            ''
                        )}
                        {toggleIsShow ? (
                            <div className="switch-button">
                                <h3>Access to private sale</h3>
                                <SwitchExample
                                    checked={checked}
                                    setChecked={setChecked}
                                />
                            </div>
                        ) : (
                            ''
                        )}
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
