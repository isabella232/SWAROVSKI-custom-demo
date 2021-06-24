import React, { useState } from 'react';

import {
    connectRefinementList,
    connectHierarchicalMenu,
    connectRange
} from 'react-instantsearch-dom';

// Prerequisite: install rheostat@4
import 'rheostat/initialize';
import Rheostat from 'rheostat';
import 'rheostat/css/rheostat.css';

const CustomFilters = () => {
    return (
        <div className="filters-wrapper">
            <HierarchicalMenu
                attributes={['categorylvl1', 'categorylvl2', 'categorylvl3']}
                name="Categories"
            />
            <CustomRefinementList attribute="color" />
            <CustomSizeRefinementList attribute="size" />
            <CustomRangeSlider attribute="price" min={10} max={500} />
        </div>
    );
};

const CatFilter = ({ items, currentRefinement, refine, createURL }) => {
    return (
        <div className="filters-content">
            <div className="title">
                <h3>Category</h3>
                <p>-</p>
            </div>
            <ul className="filter-list-content">
                {items.map(item => (
                    <li className="filter-list" key={item.label}>
                        <a
                            className="button-filter"
                            href={createURL(item.value)}
                            style={{ fontWeight: item.isRefined ? 'bold' : '' }}
                            onClick={event => {
                                event.preventDefault();
                                refine(item.value);
                            }}
                        >
                            {item.label}
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
            </ul>
            <div className="line"></div>
        </div>
    );
};

const HierarchicalMenu = connectHierarchicalMenu(CatFilter);

// Color Filter
const ColorRefinementList = ({ items, refine }) => {
    const [colors, setColors] = useState(true);
    return (
        <div className="filters-content">
            <div
                className="title"
                onClick={() => {
                    setColors(!colors);
                }}
            >
                <h3>Colors</h3>
                <p>-</p>
            </div>
            <ul
                className={`filter-list-content ${
                    colors ? 'active-filters' : 'hidden-filters'
                }`}
            >
                {items.map(item => (
                    <li className="filter-list" key={item.label}>
                        <a
                            className="button-filter"
                            href="#"
                            onClick={event => {
                                event.preventDefault();
                                refine(item.value);
                            }}
                        >
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>
            <div className="line"></div>
        </div>
    );
};

// On click Function See More Colors
const CustomRefinementList = connectRefinementList(ColorRefinementList);

// Size Filter

const SizeRefinementList = ({ items, refine }) => (
    <div className="filters-content">
        <div className="title">
            <h3>Size</h3>
            <p>-</p>
        </div>
        <ul className="filter-list-content">
            {items.map(item => (
                <li className="filter-list" key={item.label}>
                    <a
                        className="button-filter"
                        href="#"
                        style={{ fontWeight: item.isRefined ? 'bold' : '' }}
                        onClick={event => {
                            event.preventDefault();
                            refine(item.value);
                        }}
                    >
                        {item.label}
                    </a>
                </li>
            ))}
        </ul>
        <div className="line"></div>
    </div>
);

const CustomSizeRefinementList = connectRefinementList(SizeRefinementList);

// Price Filter

const RangeSlider = ({ min, max, currentRefinement, canRefine, refine }) => {
    const [stateMin, setStateMin] = React.useState(min);
    const [stateMax, setStateMax] = React.useState(max);

    React.useEffect(() => {
        if (canRefine) {
            setStateMin(currentRefinement.min);
            setStateMax(currentRefinement.max);
        }
    }, [currentRefinement.min, currentRefinement.max]);

    if (min === max) {
        return null;
    }

    const onChange = ({ values: [min, max] }) => {
        if (currentRefinement.min !== min || currentRefinement.max !== max) {
            refine({ min, max });
        }
    };

    const onValuesUpdated = ({ values: [min, max] }) => {
        setStateMin(min);
        setStateMax(max);
    };

    return (
        <Rheostat
            min={min}
            max={max}
            values={[currentRefinement.min, currentRefinement.max]}
            onChange={onChange}
            onValuesUpdated={onValuesUpdated}
        >
            <div
                className="rheostat-marker rheostat-marker--large"
                style={{ left: 0 }}
            >
                <div className="rheostat-value">{stateMin}</div>
            </div>
            <div
                className="rheostat-marker rheostat-marker--large"
                style={{ right: 0 }}
            >
                <div className="rheostat-value">{stateMax}</div>
            </div>
        </Rheostat>
    );
};

const CustomRangeSlider = connectRange(RangeSlider);

export default CustomFilters;
