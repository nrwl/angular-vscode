#!/usr/bin/env node

import * as path from 'path';
import * as fs from 'fs';
import { recommendations } from './utils/recommendations';

let existing: { recommendations: string[] };
let extensionsFile = path.join('.vscode', 'extensions.json');
try {
  existing = JSON.parse(fs.readFileSync(extensionsFile).toString());
} catch (e) {}

if (existing) {
  existing.recommendations = existing.recommendations || [];
  recommendations.forEach(function(extension) {
    if (!existing.recommendations.includes(extension)) {
      existing.recommendations.push(extension);
    }
  });

  fs.writeFileSync(extensionsFile, JSON.stringify(existing, null, 2));
} else {
  try {
    fs.mkdirSync('.vscode');
  } catch (e) {}

  fs.writeFileSync(
    extensionsFile,
    JSON.stringify(
      {
        recommendations: recommendations
      },
      null,
      2
    )
  );
}
