import { ECharts, EChartsOption } from 'echarts';

function convertToArray<T>(val: T | T[]): T[] {
  return Array.isArray(val) ? val : [val];
}
class Scene {
  // One scene may have mulitple options. each option will use merge mode to simplify the option code.
  private _options: EChartsOption[];
  private _durations: number[];
  private _titles: string | string[];
  private _backgrounds: string | string[];

  private _currentIndex: number = 0;

  private _timeout: number = 0;

  constructor(opts: {
    option: EChartsOption | EChartsOption[];
    duration: number | number[];
    background?: string;
    title?: string;
  }) {
    this._options = convertToArray(opts.option);
    this._durations = convertToArray(opts.duration);
    this._titles = convertToArray(opts.title || '');
    this._backgrounds = convertToArray(opts.background || '');
  }

  getDuration() {
    let sum = 0;
    this._options.forEach((opt, idx) => {
      const duration =
        this._durations[idx] || this._durations[this._durations.length - 1];
      sum += duration;
    });
    return sum;
  }

  play(chart: ECharts) {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
    // Reset
    this._currentIndex = 0;
    this._playCurrent(chart, true);
  }

  private _playCurrent(chart: ECharts, notMerge: boolean) {
    if (this._currentIndex >= this._options.length) {
      return;
    }
    chart.setOption(this._options[this._currentIndex], notMerge);

    const duration =
      this._durations[this._currentIndex] ||
      this._durations[this._durations.length - 1];
    // Play next scene.
    this._timeout = (setTimeout(() => {
      this._playCurrent(chart, false);
    }, duration) as unknown) as number;

    this._currentIndex++;
  }
}

export default Scene;
