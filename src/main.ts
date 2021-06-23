import './style.css'

import * as echarts from 'echarts'
import stages from './stages/index'

let playIndex = 0

if (import.meta.hot) {
  import.meta.hot.accept('./stages/index', (newStages) => {
    chart.setOption(newStages.default[playIndex], true)
  })
}

function setIndexToHash() {
  window.location.hash = 'stage_' + playIndex
}
function getIndexFromHash() {
  let newIndex = +window.location.hash.substr(1).replace('stage_', '') || 0
  if (newIndex !== playIndex) {
    playIndex = newIndex
    chart.setOption(stages[newIndex], true)
  }
}
function nextStage() {}

function setToCurrentStage(option) {}

getIndexFromHash()
// Init chart
const main = document.querySelector<HTMLDivElement>('#index-viewport')!
const chart = echarts.init(main)
chart.setOption(stages[playIndex])
setIndexToHash()

window.onresize = function () {
  chart.resize()
}
window.onhashchange = function () {
  getIndexFromHash()
}
