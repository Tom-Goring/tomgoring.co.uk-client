import React from "react";
import styled from "styled-components";

export const StyledNavbar = styled.nav`
  ${(props) => props.fixed && `position: fixed; top: 0;`}
  ${(props) => !props.fixed && `position: absolute; bottom: -4rem;`}
  height: 4rem;
  display: flex;
  width: 100%;
  background: var(--darker-background);
  border-bottom: 3px solid var(--element-color);
  z-index: 100;
  transition: none;
  align-items: center;
  pointer-events: all;
`;

let NavEl = styled.div`
  padding: 0 1rem 0 1rem;
  font-size: 1.2rem;
  margin: 0 1rem 0 1rem;
  color: var(--light-background);
  text-align: left;
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.3s ease-in;

  :hover {
    color: var(--highlight-color);
  }
`;

const Scroll = (props) => {
  let el = React.createRef();

  React.useEffect(() => {
    el.current = document.getElementById(props.to);
  });

  const scroll = () => {
    window.scrollTo(0, el.current.offsetTop);
  };

  return (
    <NavEl
      onClick={() => {
        console.log(el);
        scroll();
      }}>
      {props.display}
    </NavEl>
  );
};

const NavbarContent = (props) => {
  return (
    <StyledNavbar fixed={props.fixed}>
      <Scroll to="landing" display="Home" />
      <Scroll to="about" display="About" />
      <Scroll to="skills" display="Skills" />
      <Scroll to="projects" display="Projects" />
      <Scroll to="contact" display="Contact" />
    </StyledNavbar>
  );
};

export const DynamicNavbar = (props) => {
  const [fixed, setFixed] = React.useState(false);

  React.useEffect(() => {
    const updateScrollPos = () => {
      setFixed(window.scrollY > window.innerHeight);
    };
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
