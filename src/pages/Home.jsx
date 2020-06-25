import React from "react";
import Canvas from "../components/Canvas";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { FlexBox } from "../components/FlexBox";

const Section = styled.section`
  height: 100vh;
  pointer-events: none;
`;

const Text = styled.div`
  font-size: 3.5rem;
  color: white;
  text-align: center;
  margin-bottom: 1.5rem;
  z-index: 2;
  pointer-events: none;
  font-weight: 400;
  line-height: 1.5;

  @media only screen and (max-width: 570px) {
    font-size: 2rem;

    button {
      font-size: 1.2rem;
    }
  }
`;

const Button = styled.button`
  cursor: pointer;
  color: white;
  background: 0 0;
  padding: 0.5rem 1.3rem 0.5rem 1rem;
  font-size: 1.7rem;
  transition: all 0.5s;
  border: 2px solid white;
  z-index: 1;
  text-transform: uppercase;

  :hover {
    background-color: var(--element-color);
    border-color: var(--element-color);
  }

  svg {
    margin-left: 0.9rem;
    transition: transform 0.3s;
  }

  :hover svg {
    transform: rotate(90deg);
  }

  :focus {
    outline: 0;
  }
`;

export default (props) => {
  return (
    <div className="home">
      <Section
        className="landing"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Canvas />
        <FlexBox column>
          <Text>
            <span>Hello, I'm </span>
            <span style={{ color: "var(--highlight-color)" }}>Tom Goring</span>
            <br />
            <span>Software Engineer Intern</span>
            <br />
            <Button style={{ pointerEvents: "all" }}>
              <span>Find out more</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </Text>
        </FlexBox>
      </Section>
    </div>
  );
};
