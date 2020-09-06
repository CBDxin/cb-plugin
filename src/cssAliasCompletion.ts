import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import findCssAlias from './findCssAlias';

const classMatchReg = /className=["|']/;

function provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
  const start: vscode.Position = new vscode.Position(position.line, 0);
  const range: vscode.Range = new vscode.Range(start, position);
  const text: string = document.getText(range);
  const directory: string = path.dirname(document.fileName);

  const rawClasses = classMatchReg.test(text);
  if (!rawClasses) {
    return [];
  }

  const aliases = findCssAlias(directory + '/style.less')

  return Object.keys(aliases).map((alias) => {
    const aliasValue = aliases[alias].value;
    const aliasDesc = aliases[alias].desc;

    const completionItem = new vscode.CompletionItem(aliasValue, vscode.CompletionItemKind.Variable);

    completionItem.detail = aliasDesc;
    completionItem.filterText = `${aliasValue}: ${alias};`;

    return completionItem;
  });
}

export default function cssAliasCompletion(context: vscode.ExtensionContext): void {
  // Css Alias auto Complete
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider('typescriptreact', { provideCompletionItems }, '"', "'")
  );
}