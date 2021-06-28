const fs = require('fs');
const path = require('path');

const echartsSrcDir = path.resolve(__dirname, '../../echarts/src');
const zrenderSrcDir = path.resolve(__dirname, '../../zrender/src');

function travel(dir, root) {
  let stat;
  try {
    stat = fs.statSync(dir);
  } catch (e) {
    return;
  }
  const item = {
    name: path.relative(root, dir),
  };
  if (stat.isDirectory()) {
    item.size = 0;
    item.children = [];
    fs.readdirSync(dir).forEach((file) => {
      if (file.startsWith('.')) {
        return;
      }
      const res = travel(path.join(dir, file), root);
      if (res) {
        item.children.push(res);
        item.size += res.size;
      }
    });
  } else {
    item.size = stat.size;
  }
  item.value = item.size;
  return item;
}

const tree = travel(echartsSrcDir, echartsSrcDir);
tree.name = 'echarts';
tree.children.push({
  name: 'zrender',
  children: travel(zrenderSrcDir, zrenderSrcDir).children,
});

fs.writeFileSync(
  path.resolve(__dirname, '../src/scenes/data/echarts-package-size.json'),
  JSON.stringify(tree, null, 2),
  'utf-8'
);
