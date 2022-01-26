import type { CustomSeriesOption, EChartsOption } from 'echarts';
import Scene from '../components/Scene';
import { defaultFont } from './common/style';
import data from './data/echarts-package-size.json';
import {
  pack,
  hierarchy,
  HierarchyNode,
  HierarchyCircularNode,
} from 'd3-hierarchy';

interface DataNode {
  name: string;
  value: number;
  children?: DataNode[];
}

const root = hierarchy<DataNode>(data as DataNode)
  .sum(function (d) {
    return d.value;
  })
  .sort(function (a, b) {
    return (b?.value || 0) - (a?.value || 0);
  });

let maxDepth = 0;
const seriesData = root.descendants().map(function (node) {
  maxDepth = Math.max(maxDepth, node.depth);
  return [node.data.value, node.depth, node.data.name];
});

const renderItem: CustomSeriesOption['renderItem'] = (params, api) => {
  const context = params.context;
  type ContextNodes = Record<
    string,
    { index: number; node: HierarchyCircularNode<DataNode> }
  >;
  let contextNodes: ContextNodes = context.nodes as ContextNodes;

  if (!contextNodes) {
    contextNodes = context.nodes = {};
    pack()
      .size([api.getWidth() - 2, api.getHeight() - 2])
      .padding(3)(root);

    root.descendants().forEach(function (node, index: number) {
      contextNodes[node.data.name] = {
        index: index,
        node: node as HierarchyCircularNode<DataNode>,
      };
    });
  }

  const nodePath = api.value(2) as string;
  const node = contextNodes[nodePath].node;
  const isLeaf = !node.children || !node.children.length;

  const textFont = api.font({
    fontSize: 12,
    fontFamily: defaultFont,
  });

  const nodeName = isLeaf
    ? nodePath
        .slice(nodePath.lastIndexOf('/') + 1)
        .split(/(?=[A-Z][^A-Z])/g)
        .join('\n')
    : '';

  const z2 = +api.value(1) * 2;

  const fontSize = node.r / 2;
  return {
    type: 'circle',
    shape: {
      cx: node.x,
      cy: node.y,
      r: node.r,
    },
    z2: z2,
    textContent:
      fontSize > 4
        ? {
            type: 'text',
            style: {
              text: nodeName,
              width: node.r * 1.3,
              overflow: 'truncate',
              fontSize: node.r / 3,
              // fill: 'blue'
            },
            emphasis: {
              style: {
                overflow: undefined,
                fontSize: Math.max(node.r / 3, 10),
                // fill: 'red'
              },
            },
          }
        : undefined,
    textConfig: {
      position: 'inside',
    },
    style: {
      fill: api.visual('color'),
      text: nodeName,
      font: textFont,
    },
    emphasis: {
      style: {
        shadowBlur: 20,
        shadowOffsetX: 3,
        shadowOffsetY: 5,
        shadowColor: 'rgba(0,0,0,0.3)',
      },
    },
  };
};

const option: EChartsOption = {
  visualMap: {
    show: false,
    min: 0,
    max: maxDepth,
    dimension: 1,
    inRange: {
      color: ['#006edd', '#e0ffff'],
    },
  },
  series: {
    type: 'custom',
    renderItem: renderItem,
    coordinateSystem: undefined,
    animationDurationUpdate: 1000,
    universalTransition: {
      enabled: true,
      seriesKey: 'hierarchy',
    },
    encode: {
      tooltip: 0,
      itemName: 2,
    },
    data: seriesData,
  },
};

export default new Scene({
  file: 'circlePacking',
  title: 'Custom Circle Packing',
  option,
  duration: 3000,
  dark: true,
  background: '#001122',
});
