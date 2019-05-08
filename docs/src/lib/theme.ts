import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  color: {
    black: '#000',
    black0: 'rgba(0, 0, 0, 0)',
    black03: 'rgba(0, 0, 0, 0.03)',
    black05: 'rgba(0, 0, 0, 0.05)',
    black07: 'rgba(0, 0, 0, 0.07)',
    black10: 'rgba(0, 0, 0, 0.1)',
    black20: 'rgba(0, 0, 0, 0.2)',
    black30: 'rgba(0, 0, 0, 0.3)',
    black40: 'rgba(0, 0, 0, 0.4)',
    black50: 'rgba(0, 0, 0, 0.5)',
    black60: 'rgba(0, 0, 0, 0.6)',
    black75: 'rgba(0, 0, 0, 0.75)',
    black80: 'rgba(0, 0, 0, 0.8)',
    black90: 'rgba(0, 0, 0, 0.9)',
    blue: '#1E50DA',
    blueDark: '#1A4898',
    blueLight: '#4A90E2',
    bluePale: '#DDE9FE',
    bluePaler: '#C3D6F7',
    green: '#31BAA2',
    greenDark: '#008A54',
    greenPale: '#A4EACF',
    magenta: '#B45877',
    offWhite: '#F7F7F8',
    orange: '#FE714B',
    orangeDark: '#E46407',
    orangePale: '#FFCAA5',
    purple: '#7748D1',
    red: '#D50F49',
    redPale: '#FFC4D2',
    teal: '#0FB5D0',
    white: '#FFF',
    yellow: '#FFDE52',
    yellowPale: '#FFF2B9',
  },
  easing: {
    // This is the most common easing curve.
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    // Objects enter the screen at full velocity from off-screen and
    // slowly decelerate to a resting point.
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    // Objects leave the screen at full velocity. They do not decelerate when off-screen.
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    // The sharp curve is used by objects that may return to the screen at any time.
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
  font: {
    default:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;',
    base: '16px',

    // Manifold Type Scale by ntassone
    // Increases or decreases 2.25× every 6th step. Infinitely nestable!
    u12: '5.0625em',
    u11: '4.4225011027em',
    u10: '3.8634105686em',
    u9: '3.375em',
    u8: '2.9483340685em',
    u7: '2.5756070457em',
    u6: '2.25em',
    u5: '1.9655560457em',
    u4: '1.7170713638em',
    u3: '1.5em',
    u2: '1.3103706971em',
    u1: '1.1447142426em',
    u0: '1em',
    d0: '1em',
    d1: '0.8735804647em',
    d2: '0.7631428284em',
    d3: '0.6666666667em',
    d4: '0.5823869765em',
    d5: '0.5087618856em',
    d6: '0.4444444444em',
    d7: '0.3882579843em',
    d8: '0.3391745904em',
    d9: '0.2962962963em',
    d10: '0.2588386562em',
    d11: '0.2261163936em',
  },
  radius: {
    default: '4px',
    large: '6px',
    xlarge: '8px',
    small: '3px',
    circle: '50%',
  },
};

export default theme;
