import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { StyledNavbar } from "./StyledNavbar";

const NavElement = styled(Link)`
  padding: 0 1rem 0 1rem;
`;

const NavbarContent = (props) => {
  return (
    <StyledNavbar fixed={props.fixed}>
      <NavElement to="/">Home</NavElement>
      <NavElement to="/foo">Foo</NavElement>
      <NavElement to="/bar">Bar</NavElement>
    </StyledNavbar>
  );
};

export const DynamicNavbar = (props) => {
  const [fixed, setFixed] = React.useState(false);

  let currentScrollY = window.scrollY;

  const updateScrollPos = () => {
    currentScrollY = window.scrollY;
    setFixed(currentScrollY > window.innerHeight);
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", updateScrollPos);

    return () => window.removeEventListener("scroll", updateScrollPos);
  }, []);

  return <NavbarContent fixed={fixed} />;
};

export const Navbar = (props) => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <NavbarContent fixed={true} />;
};
