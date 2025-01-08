import React from "react";
import Select, { components } from "react-select";

const Input = props => <components.Input {...props} maxLength={40} />;

export default function SelectPicker({ placeholder, options, onChange, selectedOption, value, disabled, onInputChange, inputValue, classes, bgColor }) {
  const customStyles = {
    control: (provided,state) => ({
      ...provided,
      backgroundColor: bgColor ? bgColor : '#e5f1f7',
      border:'none',
       boxShadow: state.isFocused ? '0 0 0 1px #004766' : provided.boxShadow,
  }),
  };
  return (
    <div className={classes ? classes : "select-picker-wrap"} style={{ marginBottom: '5px',}}>
      <Select
        defaultValue={value}
        value={selectedOption}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        classNamePrefix="select-picker"
        isDisabled={disabled}
        onInputChange={onInputChange}
        inputValue={inputValue}
        components={{ Input }}
        styles={customStyles}
      />
    </div>
  );
}


