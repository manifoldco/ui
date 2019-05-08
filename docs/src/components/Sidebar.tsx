import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

interface SidebarProps {
  pages: ([string, string])[];
}

const topPages = ['/getting-started', '/connection'];

function Sidebar({ pages }: SidebarProps) {
  const uiMenu = pages.filter(([path]) => path.indexOf('components/') !== -1);
  const dataMenu = pages.filter(([path]) => path.indexOf('data/') !== -1);
  const topMenu = topPages.map(path => pages.find(page => page.indexOf(path) !== -1) || []);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Aside>
      <Nav>
        <Header>
          <Button id="nav-button" type="button" onClick={() => setIsOpen(!isOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
              <path d="M128 554.667c-23.564 0-42.667-19.103-42.667-42.667s19.103-42.667 42.667-42.667h768c23.564 0 42.667 19.103 42.667 42.667s-19.103 42.667-42.667 42.667h-768zM128 298.667c-23.564 0-42.667-19.103-42.667-42.667s19.103-42.667 42.667-42.667h768c23.564 0 42.667 19.103 42.667 42.667s-19.103 42.667-42.667 42.667h-768zM128 810.667c-23.564 0-42.667-19.103-42.667-42.667s19.103-42.667 42.667-42.667h768c23.564 0 42.667 19.103 42.667 42.667s-19.103 42.667-42.667 42.667h-768z" />
            </svg>
          </Button>
          <Link to="/">
            <Logo src="/ui-logo.svg" alt="Manifold UI" />
          </Link>
        </Header>
        <Expanded aria-expanded={isOpen || undefined} aria-controls="nav-button" id="nav-expanded">
          <ul role="menu">
            {topMenu.map(([path, title]) => (
              <li key={path} role="menuitem">
                <Link to={path}>{title}</Link>
              </li>
            ))}
          </ul>
          <h3>UI Components</h3>
          <ul role="menu">
            {uiMenu.map(([path, title]) => (
              <li key={path} role="menuitem">
                <Link to={path}>{title}</Link>
              </li>
            ))}
          </ul>
          <h3>Data Components</h3>
          <ul role="menu">
            {dataMenu.map(([path, title]) => (
              <li key={path} role="menuitem">
                <Link to={path}>{title}</Link>
              </li>
            ))}
          </ul>
        </Expanded>
        <Underlay onClick={() => setIsOpen(false)} />
      </Nav>
    </Aside>
  );
}

const Aside = styled.aside`
  border-right: 1px solid rgba(0, 0, 0, 0.1);

  & h3 {
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: rgba(0, 0, 0, 0.5);
    font-weight: 400;
    font-size: 12px;
    font-family: 'IBM Plex Mono', monospace;
    letter-spacing: 0.125em;
    text-transform: uppercase;
  }
`;

const Button = styled.button`
  margin-right: 0.625rem;
  padding: 0.5rem;
  background: none;
  border: none;
  appearance: none;
  outline: none;

  & svg {
    display: block;
    width: 1rem;
    height: 1rem;
  }

  @media (min-width: 750px) {
    display: none;
  }
`;

const Logo = styled.img`
  display: block;
  width: 96px;
  height: 32px;
  margin-left: -0.25rem;

  @media (min-width: 750px) {
    width: 128px;
    height: 43px;
  }
`;

const Underlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  display: none;
`;

const Expanded = styled.div`
  display: none;

  @media (min-width: 750px) {
    display: block;
  }

  &[aria-expanded] {
    position: relative;
    z-index: var(--mf-layer-nav);
    display: block;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.95);

    & ~ ${Underlay} {
      display: block;
    }
  }
`;

const Header = styled.header`
  display: flex;
  margin-left: -0.5rem;
`;

const Nav = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  z-index: var(--mf-layer-nav);
  box-sizing: border-box;
  width: 100%;
  height: 4rem;
  margin: 0;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.9);

  & a {
    display: block;
    margin-top: 1rem;
    margin-bottom: 1rem;
    color: rgba(0, 0, 0, 0.8);
    font-weight: 300;
    font-size: 14px;
    text-decoration: none;
    transition: color 150ms linear;

    &[aria-current] {
      color: ${({ theme }) => theme.color.blue};
      font-weight: 700;
    }

    &:hover {
      color: ${({ theme }) => theme.color.blue};
    }
  }

  & ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  @media (min-width: 750px) {
    top: 0;
    left: 0;
    width: 15rem;
    height: 100vh;
    padding: 1.5rem;
  }
`;

export default Sidebar;
