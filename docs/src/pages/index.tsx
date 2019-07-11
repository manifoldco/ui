import React from 'react';
import { ThemeProvider } from 'styled-components';
import { graphql } from 'gatsby';
import { defineCustomElements } from '@manifoldco/ui/dist/loader';
import { defineCustomElements as defineShadowcatCustomElement } from '@manifoldco/shadowcat/dist/loader';
import Page from '../components/Page';
import theme from '../lib/theme';

if (typeof window !== 'undefined') {
  defineCustomElements(window);
  defineShadowcatCustomElement(window);
}

interface HomePageProps {
  data?: {
    home: MarkdownRemark.Data;
    page: MarkdownRemark.Data;
    toc: { edges: { node: MarkdownRemark.Data }[] };
  };
}

function HomePage({ data }: HomePageProps) {
  if (!data) return null;
  const {
    home,
    page,
    toc: { edges },
  } = data;
  const currentPage = page || home;
  const links = edges.map(({ node: { frontmatter: { title, path } } }) => {
    const link: [string, string] = [path, title];
    return link;
  });

  return (
    <ThemeProvider theme={theme}>
      <>
        <manifold-oauth oauth-url="https://manifold-shadowcat-test-server.herokuapp.com/signin/oauth/web" />
        <Page links={links} currentPage={currentPage} />
      </>
    </ThemeProvider>
  );
}

export const query = graphql`
  query($path: String! = "/getting-started") {
    home: markdownRemark(frontmatter: { path: { eq: "/getting-started" } }) {
      html
      frontmatter {
        example
        title
      }
    }
    page: markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        example
        title
      }
    }
    toc: allMarkdownRemark(sort: { fields: [frontmatter___title], order: ASC }, limit: 1000) {
      edges {
        node {
          frontmatter {
            title
            path
          }
        }
      }
    }
  }
`;

export default HomePage;
