import React from "react";

export function TextField({ name, labelText, type = "text" }) {
  return (
    <div className="TextField">
      <label className="TextField_label" for={`${name}`} type={type}>
        {labelText}
      </label>
      <input className="TextField_input" name={`${name}`}/>
    </div>
  )
}