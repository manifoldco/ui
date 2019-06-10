import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'gatsby';
import { LinkGetProps } from '@reach/router';
import { switchProp } from 'styled-tools';
import { chevron_down } from '@manifoldco/icons';
import { base64 } from './Icon';
import manifoldTheme from '../lib/theme-manifold';
import sapphireTheme from '../lib/theme-sapphire';
import rubyTheme from '../lib/theme-ruby';
import diamondTheme from '../lib/theme-diamond';
import moonTheme from '../lib/theme-moon';

interface SidebarProps {
  pages: ([string, string])[];
}

const topPages = ['/getting-started', '/connection', '/theming'];

const DEFAULT = 'default';
const MANIFOLD = 'manifold';
const SAPPHIRE = 'sapphire';
const RUBY = 'ruby';
const DIAMOND = 'diamond';
const MOON = 'moon';

const themes = [
  [DEFAULT, 'Default'],
  [MANIFOLD, 'Manifold'],
  [SAPPHIRE, 'Sapphire'],
  [RUBY, 'Ruby'],
  [DIAMOND, 'Diamond'],
  [MOON, 'Moon'],
];

// Handle link styling (needed because this doesn’t work with search params)
const linkStyling = ({ location, href }: LinkGetProps): any | null => {
  if (typeof window === 'undefined') return null;
  const pathname = href.replace(/\?.*$/, '');
  const active = { 'aria-current': true };
  // If this page is active, highlight this link
  if (location.pathname.includes(pathname)) {
    return active;
  }
  // Otherwise if this is the homepage, highlight Getting Started
  if (pathname.includes('/getting-started') && location.pathname === '/') {
    return active;
  }
  return null;
};

function Sidebar({ pages }: SidebarProps) {
  const uiMenu = pages.filter(([path]) => path.indexOf('components/') !== -1);
  const dataMenu = pages.filter(([path]) => path.indexOf('data/') !== -1);
  const topMenu = topPages.map(path => pages.find(page => page.indexOf(path) !== -1) || []);

  const [isOpen, setIsOpen] = useState(false);

  let windowTheme;
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const searchTheme = params.get('theme');
    if (searchTheme) windowTheme = searchTheme;
  }
  const [theme, setTheme] = useState(windowTheme || DEFAULT);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      params.set('theme', theme);
      window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`);
    }
  });

  // Note: ThemeSwitcher and nav links have to be same component, because Gatsby <Link /> doesn’t inherit search params
  function withSearch(path: string) {
    if (typeof window === 'undefined') return path;
    const params = new URLSearchParams(window.location.search);
    params.set('theme', theme);
    return `${path}/?${params.toString()}`;
  }

  return (
    <Aside>
      <GlobalStyle userTheme={theme} />
      <Nav>
        <Header>
          <Button id="nav-button" type="button" onClick={() => setIsOpen(!isOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
              <path d="M128 554.667c-23.564 0-42.667-19.103-42.667-42.667s19.103-42.667 42.667-42.667h768c23.564 0 42.667 19.103 42.667 42.667s-19.103 42.667-42.667 42.667h-768zM128 298.667c-23.564 0-42.667-19.103-42.667-42.667s19.103-42.667 42.667-42.667h768c23.564 0 42.667 19.103 42.667 42.667s-19.103 42.667-42.667 42.667h-768zM128 810.667c-23.564 0-42.667-19.103-42.667-42.667s19.103-42.667 42.667-42.667h768c23.564 0 42.667 19.103 42.667 42.667s-19.103 42.667-42.667 42.667h-768z" />
            </svg>
          </Button>
          <Link to={withSearch('/')}>
            <Logo src="/ui-logo.svg" alt="Manifold UI" />
          </Link>
        </Header>
        <Expanded aria-expanded={isOpen || undefined} aria-controls="nav-button" id="nav-expanded">
          <ThemeSwitcher>
            <Label htmlFor="ui-theme">Theme</Label>
            <Select id="ui-theme" onChange={e => setTheme(e.target.value)} defaultValue={theme}>
              {themes.map(([value, display]) => (
                <option key={value} value={value}>
                  {display}
                </option>
              ))}
            </Select>
          </ThemeSwitcher>
          <ul role="menu">
            {topMenu.map(([path, title]) => (
              <li key={path} role="menuitem">
                <Link to={withSearch(path)} getProps={linkStyling}>
                  {title}
                </Link>
              </li>
            ))}
          </ul>
          <h3>UI Components</h3>
          <ul role="menu">
            {uiMenu.map(([path, title]) => (
              <li key={path} role="menuitem">
                <Link to={withSearch(path)} getProps={linkStyling}>
                  {title}
                </Link>
              </li>
            ))}
          </ul>
          <h3>Data Components</h3>
          <ul role="menu">
            {dataMenu.map(([path, title]) => (
              <li key={path} role="menuitem">
                <Link to={withSearch(path)} getProps={linkStyling}>
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </Expanded>
        <Underlay onClick={() => setIsOpen(false)} />
      </Nav>
    </Aside>
  );
}

const GlobalStyle = createGlobalStyle<{ userTheme: string }>`
body {
  margin: 0;
}

${switchProp('userTheme', {
  [MANIFOLD]: manifoldTheme,
  [SAPPHIRE]: sapphireTheme,
  [RUBY]: rubyTheme,
  [DIAMOND]: diamondTheme,
  [MOON]: moonTheme,
})}
`;

const Aside = styled.aside`
  font-family: ${({ theme }) => theme.font.text};
  border-right: 1px solid rgba(0, 0, 0, 0.1);

  & h3 {
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: rgba(0, 0, 0, 0.5);
    font-weight: 400;
    font-size: 12px;
    font-family: ${({ theme }) => theme.font.monospace};
    letter-spacing: 0.125em;
    text-transform: uppercase;
  }
`;

const Button = styled.button`
  margin-right: 0.625rem;
  padding: 0.5rem;
  background: none;
  border: none;
  outline: none;
  appearance: none;

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

const Header = styled.header`
  display: flex;
  margin-bottom: 1rem;
  margin-left: -0.5rem;

  & a {
    display: block;
  }
`;

const Expanded = styled.div`
  display: none;

  @media (min-width: 750px) {
    display: block;
  }

  & a {
    display: flex;
    align-items: center;
    height: 1.5rem;
    color: rgba(0, 0, 0, 0.8);
    font-weight: 300;
    font-size: 14px;
    text-decoration: none;
    transition: color 150ms linear;

    @media (min-width: 750px) {
      height: 1.875rem;
    }

    &[aria-current] {
      color: ${({ theme }) => theme.color.blue};
      font-weight: 700;
    }

    &:hover {
      color: ${({ theme }) => theme.color.blue};
    }
  }

  &[aria-expanded] {
    position: relative;
    z-index: ${({ theme }) => theme.layer.nav};
    display: block;
    padding-bottom: 1.25rem;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.95);

    & ~ ${Underlay} {
      display: block;
    }
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.25rem;
  font-size: ${({ theme }) => theme.font.d3};
  letter-spacing: 0.0625em;
  text-transform: uppercase;
`;

const Nav = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${({ theme }) => theme.layer.nav};
  box-sizing: border-box;
  width: 100%;
  height: 4rem;
  margin: 0;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.9);

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

const Select = styled.select`
  display: block;
  width: 100%;
  padding: 0.5rem;
  background-color: white;
  background-image: url("${base64(chevron_down)}");
  background-repeat: no-repeat;
  background-position: right 0.5rem top 50%;
  background-size: auto 1rem;
  border: 1px solid ${({ theme }) => theme.color.black10};
  border-radius: ${({ theme }) => theme.radius.default};
  outline: none;
  transition: border-color 150ms linear;
  appearance: none;

  &:hover,
  &:focus {
    border-color: ${({ theme }) => theme.color.blue};
  }
`;

const ThemeSwitcher = styled.div`
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.black10};

  @media (min-width: 750px) {
    margin-top: 1rem;
  }
`;

export default Sidebar;
