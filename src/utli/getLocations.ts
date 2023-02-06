
import * as vscode from 'vscode';
const path = require('path');

export default function getLocations(document?: vscode.TextDocument){
    let workspace: string | undefined;
    if (document) {
      workspace = vscode.workspace.getWorkspaceFolder(document.uri)?.uri.fsPath;
    }

    const handlePath = (paths: string[]) => {
      return paths.map(v => {
        if (workspace) {
          return path.join(v.replace('${folder}', workspace));
        } else {
          return path.join(v);
        }
      });
    };
    const locations:
      | string
      | string[]
      | undefined = vscode.workspace
      .getConfiguration()
      .get('lessvarChris.locations');
    if (typeof locations === 'string') {
      return handlePath([locations]);
    } else if (locations instanceof Array) {
      return handlePath(locations);
    } else {
      return false;
    }
  }
  