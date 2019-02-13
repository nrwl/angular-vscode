import { Rule, Tree } from '@angular-devkit/schematics';
import * as stripJsonComments from 'strip-json-comments';

/**
 * This method is specifically for updating JSON in a Tree
 * @param path Path of JSON file in the Tree
 * @param callback Manipulation of the JSON data
 * @returns A rule which updates a JSON file file in a Tree
 */
export function updateJsonInTree<T = any, O = T>(
  path: string,
  callback: (json: T) => O
): Rule {
  return (host: Tree): Tree => {
    if (!host.exists(path)) {
      host.create(path, serializeJson(callback({} as T)));
      return host;
    }
    host.overwrite(path, serializeJson(callback(readJsonInTree(host, path))));
    return host;
  };
}

/**
 * This method is specifically for reading JSON files in a Tree
 * @param host The host tree
 * @param path The path to the JSON file
 * @returns The JSON data in the file.
 */
function readJsonInTree<T = any>(host: Tree, path: string): T {
  if (!host.exists(path)) {
    throw new Error(`Cannot find ${path}`);
  }

  return JSON.parse(stripJsonComments(host.read(path)!.toString('utf-8')));
}

function serializeJson(json: any): string {
  return `${JSON.stringify(json, null, 2)}\n`;
}
