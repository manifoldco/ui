import React from 'react';
import styled from 'styled-components';
import ApiToken from './ApiToken';

const Wrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  padding: 1rem;
  font-size: 16px;
  font-family: var(--manifold-font-family);

  & h3 {
    margin-top: 0;
    margin-bottom: 2rem;
    font-size: ${({ theme }) => theme.font.u2};
    font-family: ${({ theme }) => theme.font.monospace};
  }

  @media (min-width: 750px) {
    padding: 3rem;
    background-color: rgba(0, 0, 0, 0.025);
  }
`;

const Inner = styled.div`
  background-color: white;

  @media (min-width: 750px) {
    padding: 1.5rem;
    border-radius: 1rem;
    box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.1);
  }
`;

const Heading = styled.h3`
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.5rem;
  color: white;
  font-size: 0.8rem;
  background: black;
`;

interface ExampleProps {
  html: string;
}

const Example: React.FunctionComponent<ExampleProps> = ({ html }) => (
  <Wrapper id="example">
    <Heading>Example</Heading>
    <ApiToken />
    <Inner className="example-inner" dangerouslySetInnerHTML={{ __html: html }} />
  </Wrapper>
);

export default Example;
