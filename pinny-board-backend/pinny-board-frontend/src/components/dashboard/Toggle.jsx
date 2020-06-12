import React from "react";
import PropTypes from "prop-types";
import "./Toggle.css";

export const Toggle = ({ id, value, checked, handleCheckChildElement }) => (
  <>
    <input
      type="checkbox"
      value={value}
      checked={checked}
      onChange={handleCheckChildElement}
      className="react-switch-checkbox "
      id={id}
    />
    <label
      style={{ background: checked && "green" }}
      className="react-switch-label"
      htmlFor={id}
    >
      <span className={`react-switch-button`} />
    </label>
    <div>{value}</div>
  </>
);
Toggle.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.number.isRequired,
  checked: PropTypes.bool,
  handleCheckChildElement: PropTypes.func.isRequired
};
export default Toggle;
