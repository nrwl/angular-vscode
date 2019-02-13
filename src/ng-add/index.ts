import { Rule, chain } from '@angular-devkit/schematics';
import { updateJsonInTree } from '../utils/json-utils';

const addExtensionRecommendations = updateJsonInTree<{
  recommendations?: string[];
}>('.vscode/extensions.json', json => {
  json.recommendations = json.recommendations || [];
  [
    'nrwl.angular-console',
    'angular.ng-template'
  ].forEach(extension => {
    if (!json.recommendations.includes(extension)) {
      json.recommendations.push(extension);
    }
  });

  return json;
});

const removeFromPackageJson = updateJsonInTree('package.json', json => {
  delete json.dependencies['angular-vscode'];
  delete json.devDependencies['angular-vscode'];

  return json;
});

export default function(schema: any): Rule {
  return chain([addExtensionRecommendations, removeFromPackageJson]);
}
