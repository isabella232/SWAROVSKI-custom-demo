import React from 'react';

import {
    connectSearchBox,
    connectCurrentRefinements
} from 'react-instantsearch-dom';

import uniqBy from 'lodash.uniqby';

const SearchBox = ({ currentRefinement, refine }) => {
    return (
        <div>
            <div className="searchBox-wrapper">
                <input
                    type="search"
                    value={currentRefinement}
                    onChange={event => refine(event.currentTarget.value)}
                    placeholder="Search..."
                />
            </div>
            <CustomCurrentRefinements
                transformItems={items =>
                    items.filter(item => item.attribute !== 'price')
                }
            />
        </div>
    );
};

const CustomSearchBox = connectSearchBox(SearchBox);

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

export default CustomSearchBox;
