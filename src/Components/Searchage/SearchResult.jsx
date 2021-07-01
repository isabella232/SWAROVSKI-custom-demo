import React, { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import PropTypes from 'prop-types';
import Switch from 'react-switch';

import uniqBy from 'lodash.uniqby';

import {
    InstantSearch,
    Pagination,
    Configure,
    QueryRuleContext,
    connectCurrentRefinements
} from 'react-instantsearch-dom';

//COMPONENTS
import CustomHits from './Hits';
import CustomHitsPrivate from './CustomHitsPrivate';
import CustomFilters from './Filters';
import CustomSearchBar from './SearchBox';

const SearchResults = ({ searchVisible, setSearchVisible }) => {
    console.log(localStorage.getItem('query'));

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
        const allParams = new URLSearchParams(window.location.search).get(
            'newsletter'
        );

        if (params !== allParams) {
            console.log(params, allParams);
            setParams(allParams);
        }

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
            // setParams(params);
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
            // setParams(params);
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
            // setParams(params);
        }
    }

    return (
        <div className={`container ${searchVisible ? 'active' : 'hidden'}`}>
            <InstantSearch
                searchClient={searchClient}
                indexName="swarovski_customDemo_products"
            >
                <div
                    className={`${
                        isGlobal || isPrivate || isPublic
                            ? 'searchHidden'
                            : 'searchShow'
                    }`}
                >
                    <CustomSearchBar />
                </div>

                {checked ? (
                    <div>
                        {!isGlobal && !isPrivate ? (
                            <Configure
                                analytics={false}
                                ruleContexts={'private'}
                            />
                        ) : (
                            <Configure
                                analytics={false}
                                ruleContexts={[params]}
                            />
                        )}
                        <div className="search-switch">
                            {noParams ? (
                                <div>{/* <CustomSearchBar /> */}</div>
                            ) : (
                                <CustomCurrentRefinements
                                    transformItems={items =>
                                        items.filter(
                                            item => item.attribute !== 'price'
                                        )
                                    }
                                />
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
                    </div>
                ) : (
                    <div
                        // ...
                        searchClient={searchClient}
                        indexName="swarovski_customDemo_products"
                    >
                        <QueryRuleContext />
                        {!isGlobal && !isPublic ? (
                            <Configure
                                filters="segment:'public'"
                                ruleContexts={['public']}
                            />
                        ) : (
                            <Configure
                                analytics={false}
                                filters="segment:'public'"
                                ruleContexts={[params]}
                            />
                        )}

                        <div className="search-switch">
                            {noParams ? (
                                <div>{/* <CustomSearchBar /> */}</div>
                            ) : (
                                <CustomCurrentRefinements
                                    transformItems={items =>
                                        items.filter(
                                            item => item.attribute !== 'price'
                                        )
                                    }
                                />
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
                    </div>
                )}
            </InstantSearch>
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

const CurrentRefinements = ({ items, refine }) => {
    const unique = uniqBy(items, 'currentRefinement');

    return (
        <ul className="refinement-content">
            {unique.map(item => (
                <li className="refinement-item" key={item.label}>
                    {item.items ? (
                        <React.Fragment>
                            <h3>{item.label}</h3>
                            <ul className="refinement-results">
                                {item.items.map(nested => (
                                    <li key={nested.label}>
                                        <a
                                            className="refinement-filter"
                                            href="#"
                                            onClick={event => {
                                                event.preventDefault();
                                                refine(nested.value);
                                            }}
                                        >
                                            {nested.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </React.Fragment>
                    ) : (
                        <a
                            href="#"
                            onClick={event => {
                                event.preventDefault();
                                refine(item.value);
                            }}
                        >
                            {item.label}
                        </a>
                    )}
                </li>
            ))}
        </ul>
    );
};

const CustomCurrentRefinements = connectCurrentRefinements(CurrentRefinements);

export default SearchResults;
