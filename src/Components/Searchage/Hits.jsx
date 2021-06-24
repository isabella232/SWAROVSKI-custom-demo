import React from 'react'

import {

    SortBy,
    Stats
} from 'react-instantsearch-dom';
import {

    connectHits,

} from 'react-instantsearch-dom'


const Hits = ({ hits }) => {
    console.log(hits)
    return (

        <div className="hits-wrapper">
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
            <ul className="hits-list">
                {hits.map((hit) => (
                    <li className="hit-list">
                        <div className="image-wrapper">
                            <img src={hit.image_link} alt="" />
                        </div>
                        <div className="infos">
                            <h3>{hit.title}</h3>
                            <p>$ {hit.price}.00</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
const CustomHits = connectHits(Hits)

export default CustomHits;