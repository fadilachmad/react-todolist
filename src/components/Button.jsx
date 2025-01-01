import React from "react";

const Button = ({ type = "submit", children }) => {
  return (
    <button
      type={type}
      className="px-3 py-2 border border-black hover:bg-black hover:text-white "
    >
      {children}
    </button>
  );
};

export default Button;
