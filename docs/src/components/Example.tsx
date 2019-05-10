import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  padding: 1rem;
  font-size: 16px;

  & h3 {
    margin-top: 0;
    margin-bottom: 2rem;
    font-family: ${({ theme }) => theme.font.code};
    font-size: ${({ theme }) => theme.font.u2};
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

interface ExampleProps {
  html: string;
}

const Example: React.FunctionComponent<ExampleProps> = ({ html }) => (
  <Wrapper>
    <h3>Example</h3>
    <Inner dangerouslySetInnerHTML={{ __html: html }} />
  </Wrapper>
);

export default Example;
