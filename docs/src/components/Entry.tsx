import React from 'react';
import styled from 'styled-components';
import 'github-markdown-css';
import hljs from 'highlight.js/lib/highlight';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';

hljs.registerLanguage('css', css);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('json', json);
hljs.registerLanguage('ts', typescript);
hljs.registerLanguage('xml', xml);

interface MarkdownProps {
  html: string;
}

class Entry extends React.Component<MarkdownProps> {
  componentDidMount() {
    document.querySelectorAll('pre code').forEach(block => hljs.highlightBlock(block));
  }

  render() {
    const { html } = this.props;
    return <Readme className="markdown-body" dangerouslySetInnerHTML={{ __html: html }} />;
  }
}

const Readme = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-top: 2.5rem;
  padding-right: 2rem;
  padding-bottom: 2.5rem;
  padding-left: 2rem;

  @media (min-width: 750px) {
    max-width: calc(100vw - 15rem);
  }

  @media (min-width: 1106px) {
    width: 100%;
    max-width: 50rem;
    padding-right: 0;
    padding-left: 0;
  }

  & pre,
  & code {
    font-family: ${({ theme }) => theme.font.monospace};
  }

  & pre {
    color: white;
    background-color: #18171b;
    background-image: linear-gradient(-45deg, rgba(240, 3, 69, 0.2), rgba(30, 80, 218, 0.2));
    border-radius: 0.625rem;
  }

  & h1,
  & h2,
  & h3,
  & h4,
  & h5,
  & h6 {
    max-width: 50rem;
    margin-right: auto;
    margin-left: auto;
    font-weight: 400;
    font-family: ${({ theme }) => theme.font.monospace};
    border-bottom: 0;
  }

  & h1 {
    margin-top: 3rem;
    font-weight: 800;
    font-size: 48px;
    font-family: ${({ theme }) => theme.font.text};
  }

  & h2 {
    margin-top: 3rem;
    font-size: 20px;
    border-bottom: none;
  }

  & h3 {
    color: rgba(0, 0, 0, 0.4);
    font-weight: 700;
    font-size: 16px;
    text-transform: uppercase;
  }

  & p {
    margin-top: 1.5em;
    margin-bottom: 1.5em;
    font-size: 14px;
    line-height: 1.5;
  }

  /* highlight.js */

  & .hljs {
    color: #ea62b3;
  }

  & .hljs-attr {
    color: ${({ theme }) => theme.color.teal};
  }

  & .hljs-built_in {
    color: ${({ theme }) => theme.color.teal};
  }

  & .hljs-comment {
    color: rgba(255, 255, 255, 0.5);
  }

  & .hljs-function {
    color: ${({ theme }) => theme.color.yellow};
  }

  & .hljs-keyword {
    color: ${({ theme }) => theme.color.purple};
    filter: saturate(120%) brightness(125%);
  }

  & .hljs-params {
    color: ${({ theme }) => theme.color.blue};
    filter: saturate(120%) brightness(150%);
  }

  & .hljs-string {
    color: ${({ theme }) => theme.color.green};
  }

  & .hljs-subst {
    color: ${({ theme }) => theme.color.orange};
  }

  & .hljs-tag {
    color: #e77878;
  }
`;

export default Entry;
