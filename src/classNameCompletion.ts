import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import getCssClassNames from './getCssClassNames';

const classMatchReg = /className=["|']/;

function provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
  const start: vscode.Position = new vscode.Position(position.line, 0);
  const range: vscode.Range = new vscode.Range(start, position);
  const text: string = document.getText(range);
  const directory: string = path.dirname(document.fileName);

  const rawClasses = classMatchReg.test(text);
  console.log(rawClasses)
  if (!rawClasses) {
    return [];
  }

  const classNames = getCssClassNames(directory + '/style.less');
  console.log(classNames)

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