import React from 'react';

import {
    connectRefinementList,
    connectHierarchicalMenu

} from 'react-instantsearch-dom'

const CustomFilters = () => {
    return (
        <div className="filters-wrapper">
            <HierarchicalMenu attributes={["categorylvl1", "categorylvl2", "categorylvl3"]}
                name="Categories" />
            <CustomRefinementList attribute="color" />
        </div>);
}

const CatFilter = ({ items, currentRefinement, refine, createURL }) => {
    console.log(items)
    return (<ul>
        {items.map(item => (
            <li key={item.label}>
                <a
                    href={createURL(item.value)}
                    style={{ fontWeight: item.isRefined ? 'bold' : '' }}
                    onClick={event => {
                        event.preventDefault();
                        refine(item.value);
                    }}
                >
                    {item.label} ({item.count})
                </a>
                {item.items && (
                    <HierarchicalMenu
                        items={item.items}
                        refine={refine}
                        createURL={createURL}
                    />
                )}
            </li>
        ))}
    </ul>);
}



const HierarchicalMenu = connectHierarchicalMenu(CatFilter)

const ColorRefinementList = ({ items, refine }) => (
    <ul>
        {items.map(item => (
            <li key={item.label}>
                <a
                    href="#"
                    style={{ fontWeight: item.isRefined ? 'bold' : '' }}
                    onClick={event => {
                        event.preventDefault();
                        refine(item.value);
                    }}
                >
                    {item.label} ({item.count})
                </a>
            </li>
        ))}
    </ul>
);

const CustomRefinementList = connectRefinementList(ColorRefinementList);




export default CustomFilters;