import React from 'react'

export default function BooleanChoice({value, label, type, onChange}) {
  return (
    <div>
       <label htmlFor={label}>
              {label}
              <input
                type={type}
                name={value.toString()}
                value={label}
                checked={value}
                onChange={onChange}
              />
            </label>

    </div>
  )
}
