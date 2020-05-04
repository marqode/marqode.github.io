import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "#F15B2A" };

  return (
    <ul className="nav justify-content-center">
      <NavLink to="/" activeStyle={activeStyle} exact>
        home
      </NavLink>
      <NavLink to="/portfolio" activeStyle={activeStyle}>
        portfolio
      </NavLink>
      <NavLink to="/resume" activeStyle={activeStyle}>
        resume
      </NavLink>
      <NavLink to="/sinesthesia" activeStyle={activeStyle}>
        sinesthesia
      </NavLink>
      <NavLink to="/lessons" activeStyle={activeStyle}>
        music lessons
      </NavLink>
    </ul>
  );
};

export default Header;
