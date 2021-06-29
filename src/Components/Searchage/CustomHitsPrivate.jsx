import React from 'react';

import { Stats, Highlight } from 'react-instantsearch-dom';
import { connectHits } from 'react-instantsearch-dom';
import PrivateSale from '../../Assets/Images/private-sale.png';

const Hits = ({ hits }) => {
    return (
        <div className="hits-wrapper">
            <div className="sort-and-stat">
                <Stats />
            </div>
            <ul className="hits-list">
                {hits.map(hit => {
                    if (hit.segment === 'public') {
                        return (
                            <li className="hit-list">
                                <div className="image-wrapper">
                                    <img src={hit.image_main_live} alt="" />
                                </div>
                                <div className="infos">
                                    <Highlight hit={hit} attribute="title_en" />
                                    <div className="price">
                                        {hit.price_int}.00 €
                                    </div>
                                </div>
                            </li>
                        );
                    } else {
                        return (
                            <li className="hit-list">
                                <img
                                    className="private-sale-img"
                                    src={PrivateSale}
                                    alt=""
                                />
                                <div className="image-wrapper">
                                    <img src={hit.image_main_live} alt="" />
                                </div>
                                <div className="infos">
                                    <Highlight hit={hit} attribute="title_en" />
                                    <div className="price">
                                        <div className="barred-price">
                                            {hit.price_int}.00 €
                                        </div>
                                        <div style={{ marginLeft: '1em' }}>
                                            {hit.salePrice}0 €
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    }
                })}
            </ul>
        </div>
    );
};
const CustomHits = connectHits(Hits);

export default CustomHits;
