import optionView from './option-view.json';

function convert(source: any, target: any, basePath: string) {
  for (var key in source) {
    var path = basePath ? basePath + '.' + key : key;
    if (key.match(/^\$/)) {
    } else {
      target.children = target.children || [];
      var child = {
        name: path,
      };
      target.children.push(child);
      convert(source[key], child, path);
    }
  }

  target.value = source.$count || 1;
}

const data: any = {};

convert(optionView, data, '');

export default data;
