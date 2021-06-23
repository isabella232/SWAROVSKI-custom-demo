import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import PropTypes from 'prop-types';
import {
    InstantSearch,
    Hits,
    SearchBox,
    Pagination,
    Highlight,
} from 'react-instantsearch-dom';

//COMPONENTS
import CustomHits from './Hits'
import CustomFilters from './Filters'
import CustomSearchBox from './SearchBox'

const SearchResults = ({ searchVisible }) => {
    const searchClient = algoliasearch(
        window.appID,
        window.key
    );
    console.log(searchVisible)
    return (
        <div className={`container ${searchVisible ? "active" : "hidden"}`}>
            <InstantSearch
                searchClient={searchClient}
                indexName="RayBan_FB"
            >
                <div className="search-panel">
                    <CustomSearchBox />
                    <div className="searchPanel-results">
                        {/* <Hits hitComponent={Hit} /> */}

                        <CustomFilters />
                        <CustomHits />

                    </div>
                    <div className="pagination">
                        <Pagination />
                    </div>
                </div>
            </InstantSearch>
        </div>
    );
}

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