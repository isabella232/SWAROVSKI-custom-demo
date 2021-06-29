import React from 'react';

import { Stats, Highlight } from 'react-instantsearch-dom';
import { connectHits } from 'react-instantsearch-dom';

const Hits = ({ hits }) => {
    return (
        <div className="hits-wrapper">
            <div className="sort-and-stat">
                <Stats />
            </div>
            <ul className="hits-list">
                {hits.map(hit => {
                    return (
                        <li className="hit-list">
                            <div className="image-wrapper">
                                <img src={hit.image_main_live} alt="" />
                            </div>
                            <div className="infos">
                                <Highlight hit={hit} attribute="title_en" />
                            </div>
                            {hit.price_int}.00 €
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
const CustomHits = connectHits(Hits);

export default CustomHits;
