import * as vscode from 'vscode';
import * as path from 'path';
import findVariables from '../utli/findLessVariables';

function provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
  const line = document.lineAt(position);
  const fileName = document.fileName;

  //@ts-ignore
  const lessVariablesPath = path.join(vscode.workspace.workspaceFolders[0].uri._fsPath, vscode.workspace.getConfiguration().get('cb-plugin.lessVariablesPath'));
  const variables = Object.assign({}, findVariables(lessVariablesPath));

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