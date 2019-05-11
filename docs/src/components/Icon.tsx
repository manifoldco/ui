import React from 'react';
import svgToMiniDataURI from 'mini-svg-data-uri';

export function base64(icon: string): string {
  const svg = `<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" xmlnsX="http://www.w3.org/1999/xlink"><path d="${icon}" /></svg>`;
  return svgToMiniDataURI(svg);
}

interface IconProps {
  icon: string;
  marginLeft?: boolean;
  marginRight?: boolean;
}

const Icon: React.FunctionComponent<IconProps> = ({ icon, marginLeft, marginRight, ...rest }) => (
  <svg
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    height="1em"
    width="1em"
    style={{
      marginLeft: marginLeft ? '0.75em' : undefined,
      marginRight: marginRight ? '0.75em' : undefined,
    }}
    {...rest}
  >
    <path d={icon} fill="currentColor" />
  </svg>
);

export default Icon;
