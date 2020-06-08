const breakpoints = [576, 768, 992, 1200];

const mq = breakpoints.map((bp) => `@media (min-width: ${bp / 16}rem)`);

const space = [2, 4, 8, 10, 16, 24, 32, 40, 48, 56, 64];
const space = breakpoints.map((bp) => `@media (min-width: ${bp / 16}rem)`);

const theme = {
  mq,
  space: ['0.25erm'],
};
