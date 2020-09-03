import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import findVariables from './findLessVariables';

function provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
  const word = document.getText(document.getWordRangeAtPosition(position));
  const directory = path.dirname(document.fileName);
  const line = document.lineAt(position);
  const fileName = document.fileName;
  const variables = Object.assign({}, findVariables(fileName));

  if (line.text.indexOf(':') === -1) return;

  return Object.keys(variables).map((variable) => {
    const variableValue = variables[variable];

    const completionItem = new vscode.CompletionItem(variable, vscode.CompletionItemKind.Variable);

    completionItem.detail = variableValue;
    completionItem.filterText = `${variable}: ${variableValue};`;
    completionItem.documentation = `${variable}: ${variableValue};`;

    return completionItem;
  });
}

export default function lessCompletion(context: vscode.ExtensionContext): void {
  // Styles auto Complete
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider('less', { provideCompletionItems }, '.')
  );
}