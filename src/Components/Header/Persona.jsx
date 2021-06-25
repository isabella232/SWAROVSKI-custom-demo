import React from 'react'
import Select from 'react-select'

const SelectPersona = ({ setSelectedOption }) => {
    const options = [
        { value: 'RB_Tiffany', label: 'Tiffany' },
        { value: 'RB_Ben', label: 'Ben' },
        { value: 'Neutral', label: 'Neutral' }
    ]

    //STYLE SELECT

    const colourStyles = {
        control: styles => ({ backgroundColor: 'transparent', display: 'flex', width: '100%', marginTop: '0.8rem' }),
        input: styles => ({ width: '100%' }),
        container: styles => ({ borderBottom: '1px solid black', width: '100%' }),
        valueContainer: styles => ({ backgroundColor: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }),
        placeholder: styles => ({ backgroundColor: 'transparent', fontSize: '0.8rem', color: 'black', fontFamily: "Adobe Clean Light" }),
        indicatorSeparator: styles => ({ display: "none" }),
        dropdownIndicator: styles => ({ color: 'black' }),
        singleValue: styles => ({ top: '0', width: '100%' }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isFocused ? 'black' : 'white',
                color: isFocused ? 'white' : 'black',
                fontSize: '0.8rem', fontFamily: "Adobe Clean Light", margin: '1rem',
                transition: 'all 0.2s',
                cursor: 'pointer'


            };
        },
        menuList: styles => ({ backgroundColor: 'transparent', })

    };

    const selectValue = (e) => {
        setSelectedOption(e.value)
    }

    return (
        <Select options={options} onChange={selectValue} setSelectedOption={setSelectedOption} styles={colourStyles} />
    )

}

export default SelectPersona