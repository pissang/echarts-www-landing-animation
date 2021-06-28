import optionView from './option-view.json';

function convert(source: any, target: any, basePath: string, depth: number) {
  if (depth > 3) {
    return;
  }
  for (var key in source) {
    var path = basePath ? basePath + '.' + key : key;
    if (key.match(/^\$/)) {
    } else {
      target.children = target.children || [];
      var child = {
        name: path,
      };
      target.children.push(child);
      convert(source[key], child, path, depth + 1);
    }
  }

  if (target.children) {
    target.value = 0;
    for (let i = 0; i < target.children.length; i++) {
      target.value += target.children[i].value || 0;
    }
    target.children.sort((a, b) => b.value - a.value);
  } else {
    target.value = source.$count || 1;
  }
}

const data: any = {};

convert(optionView, data, '', 0);

export default data;
