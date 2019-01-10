import React from 'react';
import PropTypes from 'prop-types';

export default function BooleanChoice({ value, label, type, onChange, checked }) {
  return (
    <div>
      <label htmlFor={label}>
        {label}
        <input type={type} name={value.toString()} value={value} checked={checked} onChange={onChange} />
      </label>
    </div>
  );
}

BooleanChoice.propTypes = {
  value: PropTypes.bool,
  label: PropTypes.string,
  checked: PropTypes.bool,
  type: PropTypes.string,
  onChange: PropTypes.func,
};
