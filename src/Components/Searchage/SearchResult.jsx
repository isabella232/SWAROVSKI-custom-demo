import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import PropTypes from 'prop-types';

import {
    InstantSearch,
    Hits,
    SearchBox,
    Pagination,
    Highlight,
    Configure,
    SortBy,
    Stats
} from 'react-instantsearch-dom';

//COMPONENTS
import CustomHits from './Hits';
import CustomFilters from './Filters';
import CustomSearchBox from './SearchBox';

const SearchResults = ({ searchVisible, catSunglasses, catEyeGlasses }) => {
    const searchClient = algoliasearch(window.appID, window.key);
    console.log(searchVisible);
    return (
        <div
            className={`container ${
                searchVisible || catSunglasses || catEyeGlasses
                    ? 'active'
                    : 'hidden'
            }`}
        >
            <InstantSearch searchClient={searchClient} indexName="RayBan_FB">
                <div className="search-panel">
                    <CustomSearchBox />
                    <div className="sort-and-stat">
                        <Stats />
                        <SortBy
                            defaultRefinement="RayBan_FB"
                            items={[
                                {
                                    value: 'RayBan_FB',
                                    label: 'Relevancy'
                                },
                                {
                                    value: 'RayBan_FB_price_dsc',
                                    label: 'Price Desc'
                                },
                                {
                                    value: 'RayBan_FB_price_asc',
                                    label: 'Price Asc.'
                                }
                            ]}
                        />
                    </div>
                    {catSunglasses ? (
                        <div className="searchPanel-results">
                            <Configure filters="categorylvl3:Sunglasses" />
                            <CustomFilters />
                            <CustomHits />
                        </div>
                    ) : (
                        <div className="searchPanel-results">
                            <CustomFilters />
                            <CustomHits />
                        </div>
                    )}
                    <div className="pagination">
                        <Pagination />
                    </div>
                </div>
            </InstantSearch>
        </div>
    );
};

// function Hit(props) {
//     return (
//         <article>
//             <h1>
//                 <Highlight attribute="title" hit={props.hit} />
//             </h1>
//         </article>
//     );
// }

// Hit.propTypes = {
//     hit: PropTypes.object.isRequired,
// };

export default SearchResults;
