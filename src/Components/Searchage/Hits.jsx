import React from 'react'

import {

    connectHits,

} from 'react-instantsearch-dom'


const Hits = ({ hits }) => {
    console.log(hits)
    return (
        <div className="hits-wrapper">
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