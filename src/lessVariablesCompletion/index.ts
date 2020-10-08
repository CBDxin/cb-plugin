import * as vscode from 'vscode';
import findVariables from '../utli/findLessVariables';
import getPath from '../utli/getPath';

const provideCompletionItems = async (document: vscode.TextDocument, position: vscode.Position) => {
  const line = document.lineAt(position);
  const fileName = document.fileName;
  const lessVariablesPath = await getPath.getLessVariablesPath();

  if (line.text.indexOf(':') === -1 || lessVariablesPath === '') return;

  const variables = Object.assign({}, findVariables(lessVariablesPath));

  return Object.keys(variables).map((variable) => {
    const variableValue = variables[variable];

    const completionItem = new vscode.CompletionItem(variable, vscode.CompletionItemKind.Variable);

    completionItem.detail = variableValue;
    completionItem.filterText = `${variable}: ${variableValue};`;
    completionItem.documentation = `${variable}: ${variableValue};`;

    return completionItem;
  });
}

export default function lessCompletion(context: vscode.ExtensionContext) {
  console.log('Styles auto Complete');
  // Styles auto Complete
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider('less', { provideCompletionItems }, '.')
  );
}