import { addDays, chooseRandomly, formatDate, range } from '~/utils';

const baseDate = new Date('2022-01-01');

// TODO could we have more strict type here? - yes
const colors: string[] = ['red', 'green', 'blue'];
// or maybe:
// const colors: ['red', 'green', 'blue'] = ['red', 'green', 'blue'];

// TODO could we make this range function infer the type, so we don't get any here? - no more any here!
export const items: Item[] = range(40, (index) => ({
  date: formatDate(addDays(baseDate, index)),
  color: chooseRandomly(colors),
}));

export const dataSample = {
  start: '2022-01-01',
  end: '2022-01-03',
  color: 'red',
};

// TODO could we use inferred items type here?
export interface Item {
  date: string;
  // TODO could we use stronger color type here? - maybe smth like 'readonly'?
  readonly color: string;
}

export interface Range {
  start: string;
  end: string;
  // TODO could we use stronger color type here? - maybe smth like 'readonly'?
  readonly color: string;
}

// TODO could we type this stronger, so autocomplete by key works?
export const colorToClassName: Record<string, string> = {
  red: 'bg-red-300 text-red-900',
  green: 'bg-green-300 text-green-900',
  blue: 'bg-blue-300 text-blue-900',
};
