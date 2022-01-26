import type { ECharts, EChartsOption } from 'echarts';
import { nextTick } from 'vue';
import { APIOpts } from '../apiOpts';

function convertToArray<T>(val: T | T[]): T[] {
  return Array.isArray(val) ? val : [val];
}

export type GetOption = (
  chart: ECharts,
  apiOpts: APIOpts
) => EChartsOption | undefined | void;

type Animator = ReturnType<typeof chartSetTimeout>;

export function chartSetTimeout(chart: ECharts, cb: () => void, time: number) {
  const animator = chart
    .getZr()
    .animation.animate({ val: 0 } as any, {
      loop: false,
    })
    .when(time, {
      val: 1,
    })
    .during(() => {
      // Please don't fall sleep.
      // TODO Can be configurable.
      chart.getZr().wakeUp();
    })
    .done(() => {
      // NOTE: Must delay the callback. Or zrender flush will invoke the chartSetTimeout callback again.
      // TODO: This is something needs to be fixed in zrender.
      nextTick(cb);
    })
    .start();

  return animator;
}

export function chartClearTimeout(chart: ECharts, animator?: Animator) {
  if (!animator) {
    return;
  }
  chart.getZr().animation.removeAnimator(animator);
}

class Scene {
  private _options: (GetOption | EChartsOption)[];
  private _durations: number[];

  private _title: string;
  private _titleStyle: string;
  private _dark: boolean;
  private _background: string;

  private _file: string;

  private _currentIndex: number = 0;

  private _timeout?: Animator;

  constructor(opts: {
    /**
     * Option can be an callback to generate dynamically. We can also execute dispatchAction and not return new option
     * Each option in one scene will use merge mode to simplify the option code.
     */
    option: GetOption | EChartsOption | (GetOption | EChartsOption)[];
    duration: number | number[];
    background?: string;
    title?: string;
    titleStyle?: string;
    dark?: boolean;

    file?: string;
  }) {
    this._options = convertToArray(opts.option);
    this._durations = convertToArray(opts.duration);
    this._title = opts.title || '';
    this._titleStyle = opts.titleStyle || '';
    this._background = opts.background || '';
    this._dark = opts.dark || false;
    this._file = opts.file || 'pieEntry';
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

  getFile() {
    return this._file;
  }

  getTitle() {
    return this._title;
  }

  getTitleStyle() {
    return this._titleStyle;
  }

  getBackground() {
    return this._background;
  }

  isDark() {
    return this._dark;
  }

  reset() {
    // Reset
    this._currentIndex = 0;
  }

  play(chart: ECharts, apiOpts: APIOpts, onfinish: () => void) {
    if (this._timeout) {
      chartClearTimeout(chart, this._timeout);
    }
    this._playCurrent(chart, apiOpts, onfinish);
  }

  stop(chart: ECharts) {
    chartClearTimeout(chart, this._timeout);
  }

  private _playCurrent(chart: ECharts, apiOpts: APIOpts, onfinish: () => void) {
    if (this._currentIndex >= this._options.length) {
      onfinish();
      return;
    }
    const notMerge = this._currentIndex === 0;
    const option = this._options[this._currentIndex];
    if (typeof option === 'function') {
      const ret = option(chart, apiOpts);
      if (ret) {
        chart.setOption(ret, notMerge);
      }
    } else {
      chart.setOption(option, notMerge);
    }

    const duration =
      this._durations[this._currentIndex] ||
      this._durations[this._durations.length - 1];
    // Play next scene.
    this._timeout = chartSetTimeout(
      chart,
      () => {
        this._playCurrent(chart, apiOpts, onfinish);
      },
      duration
    );

    this._currentIndex++;
  }
}

export default Scene;
