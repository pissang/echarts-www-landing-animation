import { ECharts } from 'echarts';

export const defaultColorPalette = [
  '#5470c6',
  '#91cc75',
  '#fac858',
  '#ee6666',
  '#73c0de',
  '#3ba272',
  '#fc8452',
  '#9a60b4',
  '#ea7ccc',
];

export const defaultColorPalette2 = [
  '#51689b',
  '#ce5c5c',
  '#fbc357',
  '#8fbf8f',
  '#659d84',
  '#fb8e6a',
  '#c77288',
  '#786090',
  '#91c4c5',
  '#6890ba',
];

export const darkColorPalette = [
  '#4992ff',
  '#7cffb2',
  '#fddd60',
  '#ff6e76',
  '#58d9f9',
  '#05c091',
  '#ff8a45',
  '#8d48e3',
  '#dd79ff',
];

export const defaultFont = "'Open Sans Condensed', sans-serif";

export function getContainerFontFamily(chart: ECharts) {
  return getComputedStyle(chart.getDom()).getPropertyValue('font-family');
}
