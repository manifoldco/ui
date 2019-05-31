import React from 'react';
import styled, { css } from 'styled-components';
import Entry from './Entry';
import Example from './Example';
import SEO from './SEO';
import Sidebar from './Sidebar';

interface PageProps {
  currentPage: MarkdownRemark.Data;
  links: ([string, string])[];
}

function Page({ currentPage, links }: PageProps) {
  return (
    <>
      <SEO title={`${currentPage.frontmatter.title} | Manifold UI`} />
      <Sidebar pages={links} />
      <Main role="main">
        <Entry html={currentPage.html} />
        {currentPage.frontmatter.example && <Example html={currentPage.frontmatter.example} />}
      </Main>
    </>
  );
}

const contentStyles = css`
  --manifold-g-red: linear-gradient(to top right, #a65084, #ec7740);
  --manifold-g-yellow: linear-gradient(to top right, #ffb83a, #ffe268);

  .color {
    display: inline-block;
    width: 1.25em;
    height: 1.25em;
    margin-bottom: -0.35em;
    vertical-align: baseline;
    border: 2px solid white;
    border-radius: 4px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  }

  .tag::before {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.5em;
    height: 1.5em;
    font-weight: 700;
    font-size: 0.75em;
    text-transform: uppercase;
    border-radius: 50%;
  }

  .part-implemented::before {
    background: var(--manifold-g-yellow);
    content: 'P';
  }

  .not-implemented::before {
    color: white;
    background: var(--manifold-g-red);
    content: 'N';
  }
`;

const Main = styled.main`
  box-sizing: border-box;
  width: 100vw;
  height: calc(100vh - 4rem);
  margin-top: 4rem;
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  @media (min-width: 750px) {
    display: grid;
    grid-template-rows: min-content auto;
    min-height: 100vh;
    margin-top: 0;
    padding-left: 15rem;
  }

  ${contentStyles}
`;

export default Page;
