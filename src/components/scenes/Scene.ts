import { ECharts, EChartsOption } from 'echarts';

function convertToArray<T>(val: T | T[]): T[] {
  return Array.isArray(val) ? val : [val];
}
class Scene {
  // One scene may have mulitple options. each option will use merge mode to simplify the option code.
  private _options: EChartsOption[];
  private _durations: number[];
  private _title: string;
  private _background: string;

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
    this._title = opts.title || '';
    this._background = opts.background || '';
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

  getTitle() {
    return this._title;
  }

  play(chart: ECharts, container: HTMLElement) {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
    // Reset
    this._currentIndex = 0;
    this._playCurrent(chart, container, true);
  }

  stop() {
    clearTimeout(this._timeout);
  }

  private _playCurrent(
    chart: ECharts,
    container: HTMLElement,
    notMerge: boolean
  ) {
    if (this._currentIndex >= this._options.length) {
      return;
    }
    chart.setOption(this._options[this._currentIndex], notMerge);
    const bg = this._background;
    if (bg) {
      container.style.background = bg;
    } else {
      container.style.background = 'none';
    }

    const duration =
      this._durations[this._currentIndex] ||
      this._durations[this._durations.length - 1];
    // Play next scene.
    this._timeout = setTimeout(() => {
      this._playCurrent(chart, container, false);
    }, duration) as unknown as number;

    this._currentIndex++;
  }
}

export default Scene;
