import React from 'react';
import styled from 'styled-components';
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
`;

export default Page;
