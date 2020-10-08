import * as vscode from 'vscode';
import * as path from 'path';
import findVariables from '../utli/findLessVariables';


function provideHover(document: vscode.TextDocument, position: vscode.Position) {
  const word = document.getText(document.getWordRangeAtPosition(position));

  if(!word.startsWith('@')){
    return;
  }

  //@ts-ignore
  const lessVariablesPath = path.join(vscode.workspace.workspaceFolders[0].uri._fsPath, vscode.workspace.getConfiguration().get('cb-plugin.lessVariablesPath'));
  const variables = Object.assign({}, findVariables(lessVariablesPath));

  if(Object.keys(variables).indexOf(word) !== -1){
    return new vscode.Hover(`${word}:${variables[word]}`);
  }
}

export default function lessCompletion(context: vscode.ExtensionContext) {
  context.subscriptions.push(vscode.languages.registerHoverProvider('less', {provideHover}));
}