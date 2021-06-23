import React from 'react';

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
    console.log(items);
    return (
        <ul>
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
        </ul>
    );
};

const HierarchicalMenu = connectHierarchicalMenu(CatFilter);

// Color Filter
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

// Size Filter

const SizeRefinementList = ({ items, refine }) => (
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

const CustomSizeRefinementList = connectRefinementList(SizeRefinementList);

// Price Filter

const RangeSlider = ({ min, max, currentRefinement, canRefine, refine }) => {
    console.log('MIN', min);
    console.log('MAX', max);
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
