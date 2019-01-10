import React from 'react';
import PropTypes from 'prop-types';

export default function BooleanChoice({ value, label, type, onChange }) {
  return (
    <div>
      <label htmlFor={label}>
        {label}
        <input type={type} name={value.toString()} value={label} checked={value} onChange={onChange} />
      </label>
    </div>
  );
}

BooleanChoice.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
};
