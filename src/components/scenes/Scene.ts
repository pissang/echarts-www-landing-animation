import { ECharts, EChartsOption } from 'echarts';

class Scene {
  private _option: EChartsOption;
  private _duration: number;
  private _title: string;
  private _background: string;

  constructor(opts: {
    option: EChartsOption;
    duration: number;
    background?: string;
    title?: string;
  }) {
    this._option = opts.option;
    this._duration = opts.duration;
    this._title = opts.title || '';

    this._background = opts.background || '';
  }

  getDuration() {
    return this._duration;
  }

  play(chart: ECharts) {
    chart.setOption(this._option, true);
  }
}

export default Scene;
