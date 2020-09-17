import * as vscode from 'vscode';
import * as path from 'path';
import findCssClassNames from './findCssClassNames';

const classMatchReg = /className=["|']/;

function provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
  const start: vscode.Position = new vscode.Position(position.line, 0);
  const range: vscode.Range = new vscode.Range(start, position);
  const text: string = document.getText(range);

  const rawClasses = classMatchReg.test(text);
  if (!rawClasses) {
    return [];
  }

  //@ts-ignore
  const globalCssPath = path.join(vscode.workspace.workspaceFolders[0].uri._fsPath, vscode.workspace.getConfiguration().get('cb-plugin.globalCssPath'));
  const classNames = findCssClassNames(globalCssPath);

  return classNames.map((className) => {
    const completionItem = new vscode.CompletionItem(className, vscode.CompletionItemKind.Variable);
    completionItem.detail = className;
    return completionItem;
  });
}

export default function classNameCompletion(context: vscode.ExtensionContext): void {
  // ClassName auto Complete
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider('typescriptreact', { provideCompletionItems }, '"', "'")
  );
}