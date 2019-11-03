import React from "react";

export function Button({ children, type = "button", variant}) {
  return (
    <button
      className={`Button Button-${variant}`}
      type={type}
    >
      {children}
    </button>
  )
}